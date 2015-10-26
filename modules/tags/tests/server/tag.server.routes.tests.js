'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Tag = mongoose.model('Tag'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, tag;

/**
 * Tag routes tests
 */
describe('Tag CRUD tests', function() {
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

		// Save a user to the test db and create new Tag
		user.save(function() {
			tag = {
				name: 'Tag Name'
			};

			done();
		});
	});

	it('should be able to save Tag instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tag
				agent.post('/api/tags')
					.send(tag)
					.expect(200)
					.end(function(tagSaveErr, tagSaveRes) {
						// Handle Tag save error
						if (tagSaveErr) done(tagSaveErr);

						// Get a list of Tags
						agent.get('/api/tags')
							.end(function(tagsGetErr, tagsGetRes) {
								// Handle Tag save error
								if (tagsGetErr) done(tagsGetErr);

								// Get Tags list
								var tags = tagsGetRes.body;

								// Set assertions
								(tags[0].user._id).should.equal(userId);
								(tags[0].name).should.match('Tag Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Tag instance if not logged in', function(done) {
		agent.post('/api/tags')
			.send(tag)
			.expect(403)
			.end(function(tagSaveErr, tagSaveRes) {
				// Call the assertion callback
				done(tagSaveErr);
			});
	});

	it('should not be able to save Tag instance if no name is provided', function(done) {
		// Invalidate name field
		tag.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tag
				agent.post('/api/tags')
					.send(tag)
					.expect(400)
					.end(function(tagSaveErr, tagSaveRes) {
						// Set message assertion
						(tagSaveRes.body.message).should.match('Please fill Tag name');
						
						// Handle Tag save error
						done(tagSaveErr);
					});
			});
	});

	it('should be able to update Tag instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tag
				agent.post('/api/tags')
					.send(tag)
					.expect(200)
					.end(function(tagSaveErr, tagSaveRes) {
						// Handle Tag save error
						if (tagSaveErr) done(tagSaveErr);

						// Update Tag name
						tag.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Tag
						agent.put('/api/tags/' + tagSaveRes.body._id)
							.send(tag)
							.expect(200)
							.end(function(tagUpdateErr, tagUpdateRes) {
								// Handle Tag update error
								if (tagUpdateErr) done(tagUpdateErr);

								// Set assertions
								(tagUpdateRes.body._id).should.equal(tagSaveRes.body._id);
								(tagUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Tags if not signed in', function(done) {
		// Create new Tag model instance
		var tagObj = new Tag(tag);

		// Save the Tag
		tagObj.save(function() {
			// Request Tags
			request(app).get('/api/tags')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Tag if not signed in', function(done) {
		// Create new Tag model instance
		var tagObj = new Tag(tag);

		// Save the Tag
		tagObj.save(function() {
			request(app).get('/api/tags/' + tagObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', tag.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Tag instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tag
				agent.post('/api/tags')
					.send(tag)
					.expect(200)
					.end(function(tagSaveErr, tagSaveRes) {
						// Handle Tag save error
						if (tagSaveErr) done(tagSaveErr);

						// Delete existing Tag
						agent.delete('/api/tags/' + tagSaveRes.body._id)
							.send(tag)
							.expect(200)
							.end(function(tagDeleteErr, tagDeleteRes) {
								// Handle Tag error error
								if (tagDeleteErr) done(tagDeleteErr);

								// Set assertions
								(tagDeleteRes.body._id).should.equal(tagSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Tag instance if not signed in', function(done) {
		// Set Tag user 
		tag.user = user;

		// Create new Tag model instance
		var tagObj = new Tag(tag);

		// Save the Tag
		tagObj.save(function() {
			// Try deleting Tag
			request(app).delete('/api/tags/' + tagObj._id)
			.expect(403)
			.end(function(tagDeleteErr, tagDeleteRes) {
				// Set message assertion
				(tagDeleteRes.body.message).should.match('User is not authorized');

				// Handle Tag error error
				done(tagDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Tag.remove().exec(function(){
				done();
			});
		});
	});
});
