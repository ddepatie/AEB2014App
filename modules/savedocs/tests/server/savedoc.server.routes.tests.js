'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Savedoc = mongoose.model('Savedoc'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, savedoc;

/**
 * Savedoc routes tests
 */
describe('Savedoc CRUD tests', function() {
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

		// Save a user to the test db and create new Savedoc
		user.save(function() {
			savedoc = {
				name: 'Savedoc Name'
			};

			done();
		});
	});

	it('should be able to save Savedoc instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Savedoc
				agent.post('/api/savedocs')
					.send(savedoc)
					.expect(200)
					.end(function(savedocSaveErr, savedocSaveRes) {
						// Handle Savedoc save error
						if (savedocSaveErr) done(savedocSaveErr);

						// Get a list of Savedocs
						agent.get('/api/savedocs')
							.end(function(savedocsGetErr, savedocsGetRes) {
								// Handle Savedoc save error
								if (savedocsGetErr) done(savedocsGetErr);

								// Get Savedocs list
								var savedocs = savedocsGetRes.body;

								// Set assertions
								(savedocs[0].user._id).should.equal(userId);
								(savedocs[0].name).should.match('Savedoc Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Savedoc instance if not logged in', function(done) {
		agent.post('/api/savedocs')
			.send(savedoc)
			.expect(403)
			.end(function(savedocSaveErr, savedocSaveRes) {
				// Call the assertion callback
				done(savedocSaveErr);
			});
	});

	it('should not be able to save Savedoc instance if no name is provided', function(done) {
		// Invalidate name field
		savedoc.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Savedoc
				agent.post('/api/savedocs')
					.send(savedoc)
					.expect(400)
					.end(function(savedocSaveErr, savedocSaveRes) {
						// Set message assertion
						(savedocSaveRes.body.message).should.match('Please fill Savedoc name');
						
						// Handle Savedoc save error
						done(savedocSaveErr);
					});
			});
	});

	it('should be able to update Savedoc instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Savedoc
				agent.post('/api/savedocs')
					.send(savedoc)
					.expect(200)
					.end(function(savedocSaveErr, savedocSaveRes) {
						// Handle Savedoc save error
						if (savedocSaveErr) done(savedocSaveErr);

						// Update Savedoc name
						savedoc.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Savedoc
						agent.put('/api/savedocs/' + savedocSaveRes.body._id)
							.send(savedoc)
							.expect(200)
							.end(function(savedocUpdateErr, savedocUpdateRes) {
								// Handle Savedoc update error
								if (savedocUpdateErr) done(savedocUpdateErr);

								// Set assertions
								(savedocUpdateRes.body._id).should.equal(savedocSaveRes.body._id);
								(savedocUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Savedocs if not signed in', function(done) {
		// Create new Savedoc model instance
		var savedocObj = new Savedoc(savedoc);

		// Save the Savedoc
		savedocObj.save(function() {
			// Request Savedocs
			request(app).get('/api/savedocs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Savedoc if not signed in', function(done) {
		// Create new Savedoc model instance
		var savedocObj = new Savedoc(savedoc);

		// Save the Savedoc
		savedocObj.save(function() {
			request(app).get('/api/savedocs/' + savedocObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', savedoc.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Savedoc instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Savedoc
				agent.post('/api/savedocs')
					.send(savedoc)
					.expect(200)
					.end(function(savedocSaveErr, savedocSaveRes) {
						// Handle Savedoc save error
						if (savedocSaveErr) done(savedocSaveErr);

						// Delete existing Savedoc
						agent.delete('/api/savedocs/' + savedocSaveRes.body._id)
							.send(savedoc)
							.expect(200)
							.end(function(savedocDeleteErr, savedocDeleteRes) {
								// Handle Savedoc error error
								if (savedocDeleteErr) done(savedocDeleteErr);

								// Set assertions
								(savedocDeleteRes.body._id).should.equal(savedocSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Savedoc instance if not signed in', function(done) {
		// Set Savedoc user 
		savedoc.user = user;

		// Create new Savedoc model instance
		var savedocObj = new Savedoc(savedoc);

		// Save the Savedoc
		savedocObj.save(function() {
			// Try deleting Savedoc
			request(app).delete('/api/savedocs/' + savedocObj._id)
			.expect(403)
			.end(function(savedocDeleteErr, savedocDeleteRes) {
				// Set message assertion
				(savedocDeleteRes.body.message).should.match('User is not authorized');

				// Handle Savedoc error error
				done(savedocDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Savedoc.remove().exec(function(){
				done();
			});
		});
	});
});
