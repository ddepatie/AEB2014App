'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Analytic = mongoose.model('Analytic'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, analytic;

/**
 * Analytic routes tests
 */
describe('Analytic CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Analytic
		user.save(function() {
			analytic = {
				name: 'Analytic Name'
			};

			done();
		});
	});

	// it('should be able to save Analytic instance if logged in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Analytic
	// 			agent.post('/api/analytics')
	// 				.send(analytic)
	// 				.expect(200)
	// 				.end(function(analyticSaveErr, analyticSaveRes) {
	// 					// Handle Analytic save error
	// 					if (analyticSaveErr) done(analyticSaveErr);

	// 					// Get a list of Analytics
	// 					agent.get('/api/analytics')
	// 						.end(function(analyticsGetErr, analyticsGetRes) {
	// 							// Handle Analytic save error
	// 							if (analyticsGetErr) done(analyticsGetErr);

	// 							// Get Analytics list
	// 							var analytics = analyticsGetRes.body;

	// 							// Set assertions
	// 							(analytics[0].user._id).should.equal(userId);
	// 							(analytics[0].name).should.match('Analytic Name');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should not be able to save Analytic instance if not logged in', function(done) {
	// 	agent.post('/api/analytics')
	// 		.send(analytic)
	// 		.expect(403)
	// 		.end(function(analyticSaveErr, analyticSaveRes) {
	// 			// Call the assertion callback
	// 			done(analyticSaveErr);
	// 		});
	// });

	// it('should not be able to save Analytic instance if no name is provided', function(done) {
	// 	// Invalidate name field
	// 	analytic.name = '';

	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Analytic
	// 			agent.post('/api/analytics')
	// 				.send(analytic)
	// 				.expect(400)
	// 				.end(function(analyticSaveErr, analyticSaveRes) {
	// 					// Set message assertion
	// 					(analyticSaveRes.body.message).should.match('Please fill Analytic name');
						
	// 					// Handle Analytic save error
	// 					done(analyticSaveErr);
	// 				});
	// 		});
	// });

	// it('should be able to update Analytic instance if signed in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Analytic
	// 			agent.post('/api/analytics')
	// 				.send(analytic)
	// 				.expect(200)
	// 				.end(function(analyticSaveErr, analyticSaveRes) {
	// 					// Handle Analytic save error
	// 					if (analyticSaveErr) done(analyticSaveErr);

	// 					// Update Analytic name
	// 					analytic.name = 'WHY YOU GOTTA BE SO MEAN?';

	// 					// Update existing Analytic
	// 					agent.put('/api/analytics/' + analyticSaveRes.body._id)
	// 						.send(analytic)
	// 						.expect(200)
	// 						.end(function(analyticUpdateErr, analyticUpdateRes) {
	// 							// Handle Analytic update error
	// 							if (analyticUpdateErr) done(analyticUpdateErr);

	// 							// Set assertions
	// 							(analyticUpdateRes.body._id).should.equal(analyticSaveRes.body._id);
	// 							(analyticUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should be able to get a list of Analytics if not signed in', function(done) {
	// 	// Create new Analytic model instance
	// 	var analyticObj = new Analytic(analytic);

	// 	// Save the Analytic
	// 	analyticObj.save(function() {
	// 		// Request Analytics
	// 		request(app).get('/api/analytics')
	// 			.end(function(req, res) {
	// 				// Set assertion
	// 				res.body.should.be.an.Array.with.lengthOf(1);

	// 				// Call the assertion callback
	// 				done();
	// 			});

	// 	});
	// });


	// it('should be able to get a single Analytic if not signed in', function(done) {
	// 	// Create new Analytic model instance
	// 	var analyticObj = new Analytic(analytic);

	// 	// Save the Analytic
	// 	analyticObj.save(function() {
	// 		request(app).get('/api/analytics/' + analyticObj._id)
	// 			.end(function(req, res) {
	// 				// Set assertion
	// 				res.body.should.be.an.Object.with.property('name', analytic.name);

	// 				// Call the assertion callback
	// 				done();
	// 			});
	// 	});
	// });

	// it('should be able to delete Analytic instance if signed in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Analytic
	// 			agent.post('/api/analytics')
	// 				.send(analytic)
	// 				.expect(200)
	// 				.end(function(analyticSaveErr, analyticSaveRes) {
	// 					// Handle Analytic save error
	// 					if (analyticSaveErr) done(analyticSaveErr);

	// 					// Delete existing Analytic
	// 					agent.delete('/api/analytics/' + analyticSaveRes.body._id)
	// 						.send(analytic)
	// 						.expect(200)
	// 						.end(function(analyticDeleteErr, analyticDeleteRes) {
	// 							// Handle Analytic error error
	// 							if (analyticDeleteErr) done(analyticDeleteErr);

	// 							// Set assertions
	// 							(analyticDeleteRes.body._id).should.equal(analyticSaveRes.body._id);

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should not be able to delete Analytic instance if not signed in', function(done) {
	// 	// Set Analytic user 
	// 	analytic.user = user;

	// 	// Create new Analytic model instance
	// 	var analyticObj = new Analytic(analytic);

	// 	// Save the Analytic
	// 	analyticObj.save(function() {
	// 		// Try deleting Analytic
	// 		request(app).delete('/api/analytics/' + analyticObj._id)
	// 		.expect(403)
	// 		.end(function(analyticDeleteErr, analyticDeleteRes) {
	// 			// Set message assertion
	// 			(analyticDeleteRes.body.message).should.match('User is not authorized');

	// 			// Handle Analytic error error
	// 			done(analyticDeleteErr);
	// 		});

	// 	});
	// });

	afterEach(function(done) {
		User.remove().exec(function(){
			Analytic.remove().exec(function(){
				done();
			});
		});
	});
});
