//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var User = require('../models/user');
var projectService = require('../services/projectService');
var requestService = require('../services/requestService');
var userService = require('../services/userService');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

// chai.config.includeStack = true;

var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);

describe('Authorization', () => {

  describe('/authorization', () => {
 
   

    it('userBelongsToProject', (done) => {

        
    //   this.timeout();

       var email = "test-signup-" + Date.now() + "@email.com";
       var pwd = "pwd";

        userService.signup( email ,pwd, "Test Firstname", "Test lastname").then(function(savedUser) {
            projectService.create("test-auth", savedUser._id).then(function(savedProject) {
                requestService.createWithId("test-auth", "requester_id1", savedProject._id, "first_text").then(function(savedRequest) {

                    // var webhookContent =     { "assignee": 'assignee-member'}
                        
            
                    chai.request(server)
                        .get('/'+ savedProject._id + '/requests/' + savedRequest._id )
                        .auth(email, pwd)
                        .end((err, res) => {
                            //console.log("res",  res);
                            console.log("res.body",  res.body);
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                           
                        
                            done();
                        });

                        
                });
                });
                });
    }).timeout(20000);




    it('userNOTBelongsToProject', (done) => {

        
        //   this.timeout();
    
           var email = "test-signup-other-" + Date.now() + "@email.com";
           var pwd = "pwd";

           userService.signup( email ,pwd, "Test Firstname", "Test lastname").then(function(savedUser) {
            userService.signup(  "test-signup" + Date.now() + "@email.com" ,pwd, "Test Firstname other", "Test lastname other").then(function(savedUserOther) {
                projectService.create("test-auth", savedUserOther._id).then(function(savedProject) {
                    requestService.createWithId("test-auth", "requester_id1", savedProject._id, "first_text").then(function(savedRequest) {
    
                        // var webhookContent =     { "assignee": 'assignee-member'}
                            
                
                        chai.request(server)
                            .get('/'+ savedProject._id + '/requests/' + savedRequest._id )
                            .auth(email, pwd)
                            .end((err, res) => {
                                //console.log("res",  res);
                                console.log("res.body",  res.body);
                                res.should.have.status(403);
                                
                                done();
                            });
    
                            
                    });
                    });
                    });
                });
        }).timeout(20000);





        // it('userCANTAddProjectUser', (done) => {

        
        //     //   this.timeout();
        
        //        var email = "test-signup-other-" + Date.now() + "@email.com";
        //        var pwd = "pwd";
    
        //        userService.signup( email ,pwd, "Test Firstname", "Test lastname").then(function(savedUser) {
        //         userService.signup(  "test-signup" + Date.now() + "@email.com" ,pwd, "Test Firstname other", "Test lastname other").then(function(savedUserOther) {
        //             projectService.create("test-auth", savedUserOther._id).then(function(savedProject) {
        //                 requestService.createWithId("test-auth", "requester_id1", savedProject._id, "first_text").then(function(savedRequest) {
        
        //                     // var webhookContent =     { "assignee": 'assignee-member'}
                                
                    
        //                     chai.request(server)
        //                         .get('/'+ savedProject._id + '/requests/' + savedRequest._id )
        //                         .auth(email, pwd)
        //                         .end((err, res) => {
        //                             //console.log("res",  res);
        //                             console.log("res.body",  res.body);
        //                             res.should.have.status(403);
                                    
        //                             done();
        //                         });
        
                                
        //                 });
        //                 });
        //                 });
        //             });
        //     }).timeout(20000);






});

});


