let mongoose = require('mongoose');

let AssignmentSchema = new mongoose.Schema({
        //  id: String,
        assignmentName: String,
        assignmentSubject: String,
        assignmentGrade: Number
    },
    { collection: 'assignmentcollection' });

module.exports = mongoose.model('Assignment', AssignmentSchema);