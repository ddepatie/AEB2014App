'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Topic = mongoose.model('Topic'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, topic;

/**
 * Topic routes tests
 */
describe('Topic CRUD tests', function() {
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

		// Save a user to the test db and create new Topic
		user.save(function() {
			topic = {
				name: 'Topic Name'
			};

			done();
		});
	});

	// it('should be able to save Topic instance if logged in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Topic
	// 			agent.post('/api/topics')
	// 				.send(topic)
	// 				.expect(200)
	// 				.end(function(topicSaveErr, topicSaveRes) {
	// 					// Handle Topic save error
	// 					if (topicSaveErr) done(topicSaveErr);

	// 					// Get a list of Topics
	// 					agent.get('/api/topics')
	// 						.end(function(topicsGetErr, topicsGetRes) {
	// 							// Handle Topic save error
	// 							if (topicsGetErr) done(topicsGetErr);

	// 							// Get Topics list
	// 							var topics = topicsGetRes.body;

	// 							// Set assertions
	// 							(topics[0].user._id).should.equal(userId);
	// 							(topics[0].name).should.match('Topic Name');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should not be able to save Topic instance if not logged in', function(done) {
	// 	agent.post('/api/topics')
	// 		.send(topic)
	// 		.expect(403)
	// 		.end(function(topicSaveErr, topicSaveRes) {
	// 			// Call the assertion callback
	// 			done(topicSaveErr);
	// 		});
	// });

	// it('should not be able to save Topic instance if no name is provided', function(done) {
	// 	// Invalidate name field
	// 	topic.name = '';

	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Topic
	// 			agent.post('/api/topics')
	// 				.send(topic)
	// 				.expect(400)
	// 				.end(function(topicSaveErr, topicSaveRes) {
	// 					// Set message assertion
	// 					(topicSaveRes.body.message).should.match('Please fill Topic name');
						
	// 					// Handle Topic save error
	// 					done(topicSaveErr);
	// 				});
	// 		});
	// });

	// it('should be able to update Topic instance if signed in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Topic
	// 			agent.post('/api/topics')
	// 				.send(topic)
	// 				.expect(200)
	// 				.end(function(topicSaveErr, topicSaveRes) {
	// 					// Handle Topic save error
	// 					if (topicSaveErr) done(topicSaveErr);

	// 					// Update Topic name
	// 					topic.name = 'WHY YOU GOTTA BE SO MEAN?';

	// 					// Update existing Topic
	// 					agent.put('/api/topics/' + topicSaveRes.body._id)
	// 						.send(topic)
	// 						.expect(200)
	// 						.end(function(topicUpdateErr, topicUpdateRes) {
	// 							// Handle Topic update error
	// 							if (topicUpdateErr) done(topicUpdateErr);

	// 							// Set assertions
	// 							(topicUpdateRes.body._id).should.equal(topicSaveRes.body._id);
	// 							(topicUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should be able to get a list of Topics if not signed in', function(done) {
	// 	// Create new Topic model instance
	// 	var topicObj = new Topic(topic);

	// 	// Save the Topic
	// 	topicObj.save(function() {
	// 		// Request Topics
	// 		request(app).get('/api/topics')
	// 			.end(function(req, res) {
	// 				// Set assertion
	// 				res.body.should.be.an.Array.with.lengthOf(1);

	// 				// Call the assertion callback
	// 				done();
	// 			});

	// 	});
	// });


	// it('should be able to get a single Topic if not signed in', function(done) {
	// 	// Create new Topic model instance
	// 	var topicObj = new Topic(topic);

	// 	// Save the Topic
	// 	topicObj.save(function() {
	// 		request(app).get('/api/topics/' + topicObj._id)
	// 			.end(function(req, res) {
	// 				// Set assertion
	// 				res.body.should.be.an.Object.with.property('name', topic.name);

	// 				// Call the assertion callback
	// 				done();
	// 			});
	// 	});
	// });

	// it('should be able to delete Topic instance if signed in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Topic
	// 			agent.post('/api/topics')
	// 				.send(topic)
	// 				.expect(200)
	// 				.end(function(topicSaveErr, topicSaveRes) {
	// 					// Handle Topic save error
	// 					if (topicSaveErr) done(topicSaveErr);

	// 					// Delete existing Topic
	// 					agent.delete('/api/topics/' + topicSaveRes.body._id)
	// 						.send(topic)
	// 						.expect(200)
	// 						.end(function(topicDeleteErr, topicDeleteRes) {
	// 							// Handle Topic error error
	// 							if (topicDeleteErr) done(topicDeleteErr);

	// 							// Set assertions
	// 							(topicDeleteRes.body._id).should.equal(topicSaveRes.body._id);

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should not be able to delete Topic instance if not signed in', function(done) {
	// 	// Set Topic user 
	// 	topic.user = user;

	// 	// Create new Topic model instance
	// 	var topicObj = new Topic(topic);

	// 	// Save the Topic
	// 	topicObj.save(function() {
	// 		// Try deleting Topic
	// 		request(app).delete('/api/topics/' + topicObj._id)
	// 		.expect(403)
	// 		.end(function(topicDeleteErr, topicDeleteRes) {
	// 			// Set message assertion
	// 			(topicDeleteRes.body.message).should.match('User is not authorized');

	// 			// Handle Topic error error
	// 			done(topicDeleteErr);
	// 		});

	// 	});
	// });

	afterEach(function(done) {
		User.remove().exec(function(){
			Topic.remove().exec(function(){
				done();
			});
		});
	});
});
