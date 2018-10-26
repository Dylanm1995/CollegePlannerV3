let Assignment = require('../models/assignments');
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

router.findAllAssignments = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Assignment.find(function(err, assignments) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(assignments,null,5));
    });
}

router.findOneAssignment = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Assignment.find({ "_id" : req.params.id },function(err, assignment) {
        if (err)
            res.json({ message: 'Assignment NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(assignment,null,5));
    });
}

router.addAssignment = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var assignment = new Assignment();

    //subject.id = id;
    assignment.assignmentName = req.body.assignmentName;
    assignment.assignmentSubject = req.body.assignmentSubject;
    assignment.assignmentGrade = req.body.assignmentGrade;

    assignment.save(function(err) {
        if (err)
            res.json({ message: 'Assignment NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Assignment Successfully Added!', data: assignment });
    });
}

//https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
router.updateAssignment = (req, res) => {

    Assignment.findByIdAndUpdate(req.params.id, {
        assignmentName: req.body.assignmentName,
        assignmentSubject: req.body.assignmentSubject,
        assignmentGrade: req.body.assignmentGrade,

    }, {new: true})
        .then(assignment => {
            if(!assignment) {
                return res.status(404).send({
                    message: "Assignment not found with id " + req.params.id
                });
            }
            res.send(assignment);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Assignment not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating assignment with id " + req.params.id
        });
    });
};

router.deleteAssignment = (req, res) => {

    Assignment.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Assignment NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Assignment Successfully Deleted!'});
    });
}

module.exports = router;