let mongoose = require('mongoose');

let SubjectSchema = new mongoose.Schema({
      //  id: String,
        subjectName: String,
        subjectRoom: String,
        subjectTeacher: String
    },
    { collection: 'subjectcollection' });

module.exports = mongoose.model('Subject', SubjectSchema);