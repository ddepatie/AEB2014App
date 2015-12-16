'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	About = mongoose.model('About'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, about;

/**
 * About routes tests
 */
describe('About CRUD tests', function() {
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
			roles: ['user', 'admin']
		});

		// Save a user to the test db and create new About
		user.save(function() {
			about = {
				text: 'About Name'
			};

			done();
		});
	});

	// it('should be able to save About instance if logged in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new About
	// 			agent.post('/api/abouts')
	// 				.send(about)
	// 				.expect(200)
	// 				.end(function(aboutSaveErr, aboutSaveRes) {
	// 					// Handle About save error
	// 					if (aboutSaveErr) done(aboutSaveErr);

	// 					// Get a list of Abouts
	// 					agent.get('/api/abouts')
	// 						.end(function(aboutsGetErr, aboutsGetRes) {
	// 							// Handle About save error
	// 							if (aboutsGetErr) done(aboutsGetErr);

	// 							// Get Abouts list
	// 							var abouts = aboutsGetRes.body;

	// 							// Set assertions
	// 							(abouts[0].user._id).should.equal(userId);
	// 							(abouts[0].name).should.match('About Name');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should not be able to save About instance if not logged in', function(done) {
	// 	agent.post('/api/abouts')
	// 		.send(about)
	// 		.expect(403)
	// 		.end(function(aboutSaveErr, aboutSaveRes) {
	// 			// Call the assertion callback
	// 			done(aboutSaveErr);
	// 		});
	// });

	// it('should not be able to save About instance if no name is provided', function(done) {
	// 	// Invalidate name field
	// 	about.name = '';

	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new About
	// 			agent.post('/api/abouts')
	// 				.send(about)
	// 				.expect(400)
	// 				.end(function(aboutSaveErr, aboutSaveRes) {
	// 					// Set message assertion
	// 					(aboutSaveRes.body.message).should.match('Please fill About name');
						
	// 					// Handle About save error
	// 					done(aboutSaveErr);
	// 				});
	// 		});
	// });

	// it('should be able to update About instance if signed in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new About
	// 			agent.post('/api/abouts')
	// 				.send(about)
	// 				.expect(200)
	// 				.end(function(aboutSaveErr, aboutSaveRes) {
	// 					// Handle About save error
	// 					if (aboutSaveErr) done(aboutSaveErr);

	// 					// Update About name
	// 					about.name = 'WHY YOU GOTTA BE SO MEAN?';

	// 					// Update existing About
	// 					agent.put('/api/abouts/' + aboutSaveRes.body._id)
	// 						.send(about)
	// 						.expect(200)
	// 						.end(function(aboutUpdateErr, aboutUpdateRes) {
	// 							// Handle About update error
	// 							if (aboutUpdateErr) done(aboutUpdateErr);

	// 							// Set assertions
	// 							(aboutUpdateRes.body._id).should.equal(aboutSaveRes.body._id);
	// 							(aboutUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should be able to get a list of Abouts if not signed in', function(done) {
	// 	// Create new About model instance
	// 	var aboutObj = new About(about);

	// 	// Save the About
	// 	aboutObj.save(function() {
	// 		// Request Abouts
	// 		request(app).get('/api/abouts')
	// 			.end(function(req, res) {
	// 				// Set assertion
	// 				res.body.should.be.an.Array.with.lengthOf(1);

	// 				// Call the assertion callback
	// 				done();
	// 			});

	// 	});
	// });


	// it('should be able to get a single About if not signed in', function(done) {
	// 	// Create new About model instance
	// 	var aboutObj = new About(about);

	// 	// Save the About
	// 	aboutObj.save(function() {
	// 		request(app).get('/api/abouts/' + aboutObj._id)
	// 			.end(function(req, res) {
	// 				// Set assertion
	// 				res.body.should.be.an.Object.with.property('name', about.name);

	// 				// Call the assertion callback
	// 				done();
	// 			});
	// 	});
	// });

	// it('should be able to delete About instance if signed in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new About
	// 			agent.post('/api/abouts')
	// 				.send(about)
	// 				.expect(200)
	// 				.end(function(aboutSaveErr, aboutSaveRes) {
	// 					// Handle About save error
	// 					if (aboutSaveErr) done(aboutSaveErr);

	// 					// Delete existing About
	// 					agent.delete('/api/abouts/' + aboutSaveRes.body._id)
	// 						.send(about)
	// 						.expect(200)
	// 						.end(function(aboutDeleteErr, aboutDeleteRes) {
	// 							// Handle About error error
	// 							if (aboutDeleteErr) done(aboutDeleteErr);

	// 							// Set assertions
	// 							(aboutDeleteRes.body._id).should.equal(aboutSaveRes.body._id);

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should not be able to delete About instance if not signed in', function(done) {
	// 	// Set About user 
	// 	about.user = user;

	// 	// Create new About model instance
	// 	var aboutObj = new About(about);

	// 	// Save the About
	// 	aboutObj.save(function() {
	// 		// Try deleting About
	// 		request(app).delete('/api/abouts/' + aboutObj._id)
	// 		.expect(403)
	// 		.end(function(aboutDeleteErr, aboutDeleteRes) {
	// 			// Set message assertion
	// 			(aboutDeleteRes.body.message).should.match('User is not authorized');

	// 			// Handle About error error
	// 			done(aboutDeleteErr);
	// 		});

	// 	});
	// });

	afterEach(function(done) {
		User.remove().exec(function(){
			About.remove().exec(function(){
				done();
			});
		});
	});
});
