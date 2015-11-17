'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	SavedDoc = mongoose.model('SavedDoc'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, savedDoc;

/**
 * Saved doc routes tests
 */
describe('Saved doc CRUD tests', function() {
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

		// Save a user to the test db and create new Saved doc
		user.save(function() {
			savedDoc = {
				name: 'Saved doc Name'
			};

			done();
		});
	});

	it('should be able to save Saved doc instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Saved doc
				agent.post('/api/saved-docs')
					.send(savedDoc)
					.expect(200)
					.end(function(savedDocSaveErr, savedDocSaveRes) {
						// Handle Saved doc save error
						if (savedDocSaveErr) done(savedDocSaveErr);

						// Get a list of Saved docs
						agent.get('/api/saved-docs')
							.end(function(savedDocsGetErr, savedDocsGetRes) {
								// Handle Saved doc save error
								if (savedDocsGetErr) done(savedDocsGetErr);

								// Get Saved docs list
								var savedDocs = savedDocsGetRes.body;

								// Set assertions
								(savedDocs[0].user._id).should.equal(userId);
								(savedDocs[0].name).should.match('Saved doc Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Saved doc instance if not logged in', function(done) {
		agent.post('/api/saved-docs')
			.send(savedDoc)
			.expect(403)
			.end(function(savedDocSaveErr, savedDocSaveRes) {
				// Call the assertion callback
				done(savedDocSaveErr);
			});
	});

	it('should not be able to save Saved doc instance if no name is provided', function(done) {
		// Invalidate name field
		savedDoc.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Saved doc
				agent.post('/api/saved-docs')
					.send(savedDoc)
					.expect(400)
					.end(function(savedDocSaveErr, savedDocSaveRes) {
						// Set message assertion
						(savedDocSaveRes.body.message).should.match('Please fill Saved doc name');
						
						// Handle Saved doc save error
						done(savedDocSaveErr);
					});
			});
	});

	it('should be able to update Saved doc instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Saved doc
				agent.post('/api/saved-docs')
					.send(savedDoc)
					.expect(200)
					.end(function(savedDocSaveErr, savedDocSaveRes) {
						// Handle Saved doc save error
						if (savedDocSaveErr) done(savedDocSaveErr);

						// Update Saved doc name
						savedDoc.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Saved doc
						agent.put('/api/saved-docs/' + savedDocSaveRes.body._id)
							.send(savedDoc)
							.expect(200)
							.end(function(savedDocUpdateErr, savedDocUpdateRes) {
								// Handle Saved doc update error
								if (savedDocUpdateErr) done(savedDocUpdateErr);

								// Set assertions
								(savedDocUpdateRes.body._id).should.equal(savedDocSaveRes.body._id);
								(savedDocUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Saved docs if not signed in', function(done) {
		// Create new Saved doc model instance
		var savedDocObj = new SavedDoc(savedDoc);

		// Save the Saved doc
		savedDocObj.save(function() {
			// Request Saved docs
			request(app).get('/api/saved-docs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Saved doc if not signed in', function(done) {
		// Create new Saved doc model instance
		var savedDocObj = new SavedDoc(savedDoc);

		// Save the Saved doc
		savedDocObj.save(function() {
			request(app).get('/api/saved-docs/' + savedDocObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', savedDoc.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Saved doc instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Saved doc
				agent.post('/api/saved-docs')
					.send(savedDoc)
					.expect(200)
					.end(function(savedDocSaveErr, savedDocSaveRes) {
						// Handle Saved doc save error
						if (savedDocSaveErr) done(savedDocSaveErr);

						// Delete existing Saved doc
						agent.delete('/api/saved-docs/' + savedDocSaveRes.body._id)
							.send(savedDoc)
							.expect(200)
							.end(function(savedDocDeleteErr, savedDocDeleteRes) {
								// Handle Saved doc error error
								if (savedDocDeleteErr) done(savedDocDeleteErr);

								// Set assertions
								(savedDocDeleteRes.body._id).should.equal(savedDocSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Saved doc instance if not signed in', function(done) {
		// Set Saved doc user 
		savedDoc.user = user;

		// Create new Saved doc model instance
		var savedDocObj = new SavedDoc(savedDoc);

		// Save the Saved doc
		savedDocObj.save(function() {
			// Try deleting Saved doc
			request(app).delete('/api/saved-docs/' + savedDocObj._id)
			.expect(403)
			.end(function(savedDocDeleteErr, savedDocDeleteRes) {
				// Set message assertion
				(savedDocDeleteRes.body.message).should.match('User is not authorized');

				// Handle Saved doc error error
				done(savedDocDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			SavedDoc.remove().exec(function(){
				done();
			});
		});
	});
});
