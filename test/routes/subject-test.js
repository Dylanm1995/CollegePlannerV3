process.env.NODE_ENV = 'test';
let chai = require('chai');
//let datastore = require('../../models/subjects');

let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );
const should = require('should');
const response = require("mocha");

describe('Subjects', function (){
   /* beforeEach(function(){
        while(datastore.length > 0) {
            datastore.pop();
        }
        datastore.push(
            {_id: "5bd0ba9efb6fc05968e0858f",
                subjectName: "Web Application Development",
                subjectRoom: "F02",
                subjectTeacher: "David Drohan"}
        );
        datastore.push(
            {_id: "5bd0bab7fb6fc05968e08599",
                subjectName: "Enterprise Software Architecture",
                subjectRoom: "IT202",
                subjectTeacher: "William Doyle"}
        );
        datastore.push(
            {_id: "5bd0bad8fb6fc05968e085d9",
                subjectName: "Business Analytics",
                subjectRoom: "FTG13",
                subjectTeacher: "Brenda Mullally"}
        );
    });*/
    describe('GET /subjects',  () => {
        it('should list ALL subjects on /subjects GET', function(done) {
            chai.request(server)
                .get('/subjects')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    let result = _.map(res.body, (subject) => {
                        return {
                            _id: subject._id,
                            subjectName: subject.subjectName,
                            subjectRoom: subject.subjectRoom,
                            subjectTeacher: subject.subjectTeacher,
                        }
                    });
                    expect(result).to.include( { _id: "5bd0ba9efb6fc05968e0858f",
                        subjectName: "Web Application Development",
                        subjectRoom: "F02",
                        subjectTeacher: "David Drohan"
                    } );
                    expect(result).to.include( { _id: "5be0a6aaf00d522a9c17461b",
                        subjectName: "Enterprise Software Architecture",
                        subjectRoom: "IT202",
                        subjectTeacher: "William Doyle"
                    } );
                    expect(result).to.include( { _id: "5bd0bad8fb6fc05968e085d9",
                        subjectName: "Business Analytics",
                        subjectRoom: "FTG13",
                        subjectTeacher: "Brenda Mullally"
                    } );
                    done();
                });
        });
    });

    describe('/GET/:id subject', () => {
        it('it should GET a subject by the given id', (done) => {
                chai.request(server)
                    .get('/subjects/5bd0ba9efb6fc05968e0858f')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.include( { _id: "5bd0ba9efb6fc05968e0858f",
                            subjectName: "Web Application Development",
                            subjectRoom: "F02",
                            subjectTeacher: "David Drohan"
                        } );
                        done()
                    });
            });
        });

    describe('POST /subjects', function () {
        it('should add a SINGLE subject on /subjects POST', function(done) {
            let subject = {
                subjectName: 'Added Test Subject Name' ,
                subjectRoom: "Added Test Subject Room",
                subjectTeacher: "Added Test Subject Teacher"
            };
            chai.request(server)
                .post('/subjects')
                .send(subject)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Subject Successfully Added!' );
                    done();
                });
            after(function  (done) {
                chai.request(server)
                    .get('/subjects')
                    .end(function(err, res) {
                        let result = _.map(res.body, (subject) => {
                            return { subjectName: subject.subjectName,
                                subjectRoom: subject.subjectRoom,
                                subjectTeacher: subject.subjectTeacher
                            };
                        }  );
                        expect(result).to.include( { subjectName: "Added Test Subject Name", subjectRoom: "Added Test Subject Room", subjectTeacher: "Added Test Subject Teacher"   } );
                        done();
                    });
            });  // end-after
        });
    });
    describe('PUT /subjects/:id/', () => {
        it('should update a SINGLE subject on /subject/<id>', function(done) {
                chai.request(server)
                    .put('/subjects/5bd0bad8fb6fc05968e085d9')
                    .send({
                        _id: "5bd0bad8fb6fc05968e085d9",
                        subjectName: 'Updated Test Subject Name',
                        subjectRoom: 'Updated Test Subject Room',
                        subjectTeacher: 'Updated Test Subject Teacher'
                    })
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.include( { _id: "5bd0bad8fb6fc05968e085d9",
                            subjectName: "Updated Test Subject Name",
                            subjectRoom: "Updated Test Subject Room",
                            subjectTeacher: "Updated Test Subject Teacher"
                        } );
                        done();
                    });
            });
        it('should return a 404 and a message for invalid subject id', function(done) {
            chai.request(server)
                .put('/subject/11100001')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    //expect(res.body).to.have.property('message','Invalid Subject Id!' ) ;
                    done();
                });
        });
        });
    describe('DELETE subjects/:id', () => {
        it('should respond with a success message along with a single subject that was deleted', function(done) {

                    chai.request(server)
                        .delete('/subjects/5be0a5e9fdfcdd1450f3cfbb')
                        .end((err, res) => {
                            done();
                            // there should be no errors
                        });
                });
        });
    });

