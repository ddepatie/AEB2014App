'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Doc = mongoose.model('Doc'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, doc;

/**
 * Doc routes tests
 */
describe('Doc CRUD tests', function() {
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

		// Save a user to the test db and create new Doc
		user.save(function() {
			doc = {
				name: 'Doc Name'
			};

			done();
		});
	});

	// it('should be able to save Doc instance if logged in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Doc
	// 			agent.post('/api/docs')
	// 				.send(doc)
	// 				.expect(200)
	// 				.end(function(docSaveErr, docSaveRes) {
	// 					// Handle Doc save error
	// 					if (docSaveErr) done(docSaveErr);

	// 					// Get a list of Docs
	// 					agent.get('/api/docs')
	// 						.end(function(docsGetErr, docsGetRes) {
	// 							// Handle Doc save error
	// 							if (docsGetErr) done(docsGetErr);

	// 							// Get Docs list
	// 							var docs = docsGetRes.body;

	// 							// Set assertions
	// 							(docs[0].user._id).should.equal(userId);
	// 							(docs[0].name).should.match('Doc Name');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should not be able to save Doc instance if not logged in', function(done) {
	// 	agent.post('/api/docs')
	// 		.send(doc)
	// 		.expect(403)
	// 		.end(function(docSaveErr, docSaveRes) {
	// 			// Call the assertion callback
	// 			done(docSaveErr);
	// 		});
	// });

	// it('should not be able to save Doc instance if no name is provided', function(done) {
	// 	// Invalidate name field
	// 	doc.name = '';

	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Doc
	// 			agent.post('/api/docs')
	// 				.send(doc)
	// 				.expect(400)
	// 				.end(function(docSaveErr, docSaveRes) {
	// 					// Set message assertion
	// 					(docSaveRes.body.message).should.match('Please fill Doc name');
						
	// 					// Handle Doc save error
	// 					done(docSaveErr);
	// 				});
	// 		});
	// });

	// it('should be able to update Doc instance if signed in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Doc
	// 			agent.post('/api/docs')
	// 				.send(doc)
	// 				.expect(200)
	// 				.end(function(docSaveErr, docSaveRes) {
	// 					// Handle Doc save error
	// 					if (docSaveErr) done(docSaveErr);

	// 					// Update Doc name
	// 					doc.name = 'WHY YOU GOTTA BE SO MEAN?';

	// 					// Update existing Doc
	// 					agent.put('/api/docs/' + docSaveRes.body._id)
	// 						.send(doc)
	// 						.expect(200)
	// 						.end(function(docUpdateErr, docUpdateRes) {
	// 							// Handle Doc update error
	// 							if (docUpdateErr) done(docUpdateErr);

	// 							// Set assertions
	// 							(docUpdateRes.body._id).should.equal(docSaveRes.body._id);
	// 							(docUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should be able to get a list of Docs if not signed in', function(done) {
	// 	// Create new Doc model instance
	// 	var docObj = new Doc(doc);

	// 	// Save the Doc
	// 	docObj.save(function() {
	// 		// Request Docs
	// 		request(app).get('/api/docs')
	// 			.end(function(req, res) {
	// 				// Set assertion
	// 				res.body.should.be.an.Array.with.lengthOf(1);

	// 				// Call the assertion callback
	// 				done();
	// 			});

	// 	});
	// });


	// it('should be able to get a single Doc if not signed in', function(done) {
	// 	// Create new Doc model instance
	// 	var docObj = new Doc(doc);

	// 	// Save the Doc
	// 	docObj.save(function() {
	// 		request(app).get('/api/docs/' + docObj._id)
	// 			.end(function(req, res) {
	// 				// Set assertion
	// 				res.body.should.be.an.Object.with.property('name', doc.name);

	// 				// Call the assertion callback
	// 				done();
	// 			});
	// 	});
	// });

	// it('should be able to delete Doc instance if signed in', function(done) {
	// 	agent.post('/api/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new Doc
	// 			agent.post('/api/docs')
	// 				.send(doc)
	// 				.expect(200)
	// 				.end(function(docSaveErr, docSaveRes) {
	// 					// Handle Doc save error
	// 					if (docSaveErr) done(docSaveErr);

	// 					// Delete existing Doc
	// 					agent.delete('/api/docs/' + docSaveRes.body._id)
	// 						.send(doc)
	// 						.expect(200)
	// 						.end(function(docDeleteErr, docDeleteRes) {
	// 							// Handle Doc error error
	// 							if (docDeleteErr) done(docDeleteErr);

	// 							// Set assertions
	// 							(docDeleteRes.body._id).should.equal(docSaveRes.body._id);

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should not be able to delete Doc instance if not signed in', function(done) {
	// 	// Set Doc user 
	// 	doc.user = user;

	// 	// Create new Doc model instance
	// 	var docObj = new Doc(doc);

	// 	// Save the Doc
	// 	docObj.save(function() {
	// 		// Try deleting Doc
	// 		request(app).delete('/api/docs/' + docObj._id)
	// 		.expect(403)
	// 		.end(function(docDeleteErr, docDeleteRes) {
	// 			// Set message assertion
	// 			(docDeleteRes.body.message).should.match('User is not authorized');

	// 			// Handle Doc error error
	// 			done(docDeleteErr);
	// 		});

	// 	});
	// });

	afterEach(function(done) {
		User.remove().exec(function(){
			Doc.remove().exec(function(){
				done();
			});
		});
	});
});
