
process.env.NODE_ENV = 'test';
let chai = require('chai');
//let datastore = require('../../models/assignments');

let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );
const response = require("mocha");
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');

var mongodbUri ='mongodb://dylan:dylan123@ds239873.mlab.com:39873/collegeplannerdb';

describe('Assignments', function () {
    /* beforeEach(function(){
         while(datastore.length > 0) {
             datastore.pop();
         }
         datastore.push(
             {_id: "5bd0bec4fb6fc05968e08918",
          assignmentName: "Web App",
          assignmentSubject: "Web Applications Development",
          assignmentGrade: 3}

         );
         datastore.push(
             {_id: "5bd0bed6fb6fc05968e08920",
          assignmentName: "Project Questions",
          assignmentSubject: "Project Management",
          assignmentGrade: 15}
         );
         datastore.push(
             {_id: "5be0d0ab15f31c24c8addc0b",
          assignmentName: "Excel Sheet",
          assignmentSubject: "Business Analytics",
          assignmentGrade: 50}
         );
     });*/
    describe('GET /assignments', () => {
        it('should list ALL assignments on /assignments GET', function (done) {
            chai.request(server)
                .get('/assignments')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    let result = _.map(res.body, (assignment) => {
                        return {
                            _id: assignment._id,
                            assignmentName: assignment.assignmentName,
                            assignmentSubject: assignment.assignmentSubject,
                            assignmentGrade: assignment.assignmentGrade,
                        }
                    });
                    expect(result).to.include({
                        _id: "5bd0bec4fb6fc05968e08918",
                        assignmentName: "Web App",
                        assignmentSubject: "Web Applications Development",
                        assignmentGrade: 30
                    });
                    expect(result).to.include({
                        _id: "5bd0bed6fb6fc05968e08920",
                        assignmentName: "Project Questions",
                        assignmentSubject: "Project Management",
                        assignmentGrade: 15
                    });
                    expect(result).to.include({
                        _id: "5be0d0ab15f31c24c8addc0b",
                        assignmentName: "Excel Sheet",
                        assignmentSubject: "Business Analytics",
                        assignmentGrade: 50
                    });
                    done();
                });
        });
    });
    describe('/GET/:id assignment', () => {
        it('it should GET a assignment by the given id', (done) => {
            chai.request(server)
                .get('/assignments/5bd0bec4fb6fc05968e08918')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.include({
                        _id: "5bd0bec4fb6fc05968e08918",
                        assignmentName: "Web App",
                        assignmentSubject: "Web Applications Development",
                        assignmentGrade: 30
                    });
                    done()
                });
        });
    });
    describe('POST /assignments', function () {
        it('should add a SINGLE assignments on /assignments POST', function (done) {
            let assignments = {
                assignmentName: 'Added Test Assignment Name',
                assignmentSubject: "Added Test Assignment Subject",
                assignmentGrade: 50
            };
            chai.request(server)
                .post('/assignments')
                .send(assignments)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Assignment Successfully Added!');
                    done();
                });
            after(function (done) {
                chai.request(server)
                    .get('/assignments')
                    .end(function (err, res) {
                        let result = _.map(res.body, (assignment) => {
                            return {
                                assignmentName: assignment.assignmentName,
                                assignmentSubject: assignment.assignmentSubject,
                                assignmentGrade: assignment.assignmentGrade
                            };
                        });
                        expect(result).to.include({
                            assignmentName: "Added Test Assignment Name",
                            assignmentSubject: "Added Test Assignment Subject",
                            assignmentGrade: 50
                        });
                        done();
                    });
            });  // end-after
        });
    });
    describe('PUT /assignments/:id/', () => {
        it('should update a SINGLE assignment on /assignments/<id>', function (done) {
            chai.request(server)
                .put('/assignments/5bd0bed6fb6fc05968e08920')
                .send({
                    _id: "5bd0bed6fb6fc05968e08920",
                    assignmentName: 'Updated Test Assignment Name',
                    assignmentSubject: 'Updated Test Assignment Subject',
                    assignmentGrade: 70
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.include({
                        _id: "5bd0bed6fb6fc05968e08920",
                        assignmentName: "Updated Test Assignment Name",
                        assignmentSubject: "Updated Test Assignment Subject",
                        assignmentGrade: 70
                    });
                    done();
                });
        });
    });
    describe('DELETE assignments/:id', () => {
        it('should respond with a success message along with a single assignments that was deleted', function(done) {

            chai.request(server)
                .delete('/assignments/5bd0bee6fb6fc05968e08925')
                .end((err, res) => {
                    done();
                    // there should be no errors
                });
        });
    });
});