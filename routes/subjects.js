let Subject = require('../models/subjects');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');

var mongodbUri ='mongodb://dylan:dylan123@ds239873.mlab.com:39873/collegeplannerdb';

mongoose.connect(mongodbUri);

//mongoose.connect('mongodb://localhost:3000/collegeplannerdb');

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});

router.findAllSubjects = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Subject.find(function(err, subjects) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(subjects,null,5));
    });
}

router.findOneSubject = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Subject.find({ "_id" : req.params.id },function(err, subject) {
        if (err)
            res.json({ message: 'Subject NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(subject,null,5));
    });
}
/*
function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}
*/
router.addSubject = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var subject = new Subject();

    //subject.id = id;
    subject.subjectName = req.body.subjectName;
    subject.subjectRoom = req.body.subjectRoom;
    subject.subjectTeacher = req.body.subjectTeacher;

    subject.save(function(err) {
        if (err)
            res.json({ message: 'Subject NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Subject Successfully Added!', data: subject });
    });
}
//https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
router.updateSubject = (req, res) => {

    Subject.findByIdAndUpdate(req.params.id, {
        subjectName: req.body.subjectName,
        subjectRoom: req.body.subjectRoom,
        subjectTeacher: req.body.subjectTeacher,

    }, {new: true})
        .then(subject => {
            if(!subject) {
                return res.status(404).send({
                    message: "Subject not found with id " + req.params.id
                });
            }
            res.send(subject);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Subject not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating subject with id " + req.params.id
        });
    });
};

router.deleteSubject = (req, res) => {

    Subject.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Subject NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Subject Successfully Deleted!'});
    });
}
/*
router.findTotalVotes = (req, res) => {

    Donation.find(function(err, donations) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(donations) });
    });
}
*/
module.exports = router;