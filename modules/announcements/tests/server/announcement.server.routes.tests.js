'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Announcement = mongoose.model('Announcement'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, announcement;

/**
 * Announcement routes tests
 */
describe('Announcement CRUD tests', function() {
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

		// Save a user to the test db and create new Announcement
		user.save(function() {
			announcement = {
				name: 'Announcement Name'
			};

			done();
		});
	});

	it('should be able to save Announcement instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Announcement
				agent.post('/api/announcements')
					.send(announcement)
					.expect(200)
					.end(function(announcementSaveErr, announcementSaveRes) {
						// Handle Announcement save error
						if (announcementSaveErr) done(announcementSaveErr);

						// Get a list of Announcements
						agent.get('/api/announcements')
							.end(function(announcementsGetErr, announcementsGetRes) {
								// Handle Announcement save error
								if (announcementsGetErr) done(announcementsGetErr);

								// Get Announcements list
								var announcements = announcementsGetRes.body;

								// Set assertions
								(announcements[0].user._id).should.equal(userId);
								(announcements[0].name).should.match('Announcement Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Announcement instance if not logged in', function(done) {
		agent.post('/api/announcements')
			.send(announcement)
			.expect(403)
			.end(function(announcementSaveErr, announcementSaveRes) {
				// Call the assertion callback
				done(announcementSaveErr);
			});
	});

	it('should not be able to save Announcement instance if no name is provided', function(done) {
		// Invalidate name field
		announcement.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Announcement
				agent.post('/api/announcements')
					.send(announcement)
					.expect(400)
					.end(function(announcementSaveErr, announcementSaveRes) {
						// Set message assertion
						(announcementSaveRes.body.message).should.match('Please fill Announcement name');
						
						// Handle Announcement save error
						done(announcementSaveErr);
					});
			});
	});

	it('should be able to update Announcement instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Announcement
				agent.post('/api/announcements')
					.send(announcement)
					.expect(200)
					.end(function(announcementSaveErr, announcementSaveRes) {
						// Handle Announcement save error
						if (announcementSaveErr) done(announcementSaveErr);

						// Update Announcement name
						announcement.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Announcement
						agent.put('/api/announcements/' + announcementSaveRes.body._id)
							.send(announcement)
							.expect(200)
							.end(function(announcementUpdateErr, announcementUpdateRes) {
								// Handle Announcement update error
								if (announcementUpdateErr) done(announcementUpdateErr);

								// Set assertions
								(announcementUpdateRes.body._id).should.equal(announcementSaveRes.body._id);
								(announcementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Announcements if not signed in', function(done) {
		// Create new Announcement model instance
		var announcementObj = new Announcement(announcement);

		// Save the Announcement
		announcementObj.save(function() {
			// Request Announcements
			request(app).get('/api/announcements')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Announcement if not signed in', function(done) {
		// Create new Announcement model instance
		var announcementObj = new Announcement(announcement);

		// Save the Announcement
		announcementObj.save(function() {
			request(app).get('/api/announcements/' + announcementObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', announcement.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Announcement instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Announcement
				agent.post('/api/announcements')
					.send(announcement)
					.expect(200)
					.end(function(announcementSaveErr, announcementSaveRes) {
						// Handle Announcement save error
						if (announcementSaveErr) done(announcementSaveErr);

						// Delete existing Announcement
						agent.delete('/api/announcements/' + announcementSaveRes.body._id)
							.send(announcement)
							.expect(200)
							.end(function(announcementDeleteErr, announcementDeleteRes) {
								// Handle Announcement error error
								if (announcementDeleteErr) done(announcementDeleteErr);

								// Set assertions
								(announcementDeleteRes.body._id).should.equal(announcementSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Announcement instance if not signed in', function(done) {
		// Set Announcement user 
		announcement.user = user;

		// Create new Announcement model instance
		var announcementObj = new Announcement(announcement);

		// Save the Announcement
		announcementObj.save(function() {
			// Try deleting Announcement
			request(app).delete('/api/announcements/' + announcementObj._id)
			.expect(403)
			.end(function(announcementDeleteErr, announcementDeleteRes) {
				// Set message assertion
				(announcementDeleteRes.body.message).should.match('User is not authorized');

				// Handle Announcement error error
				done(announcementDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Announcement.remove().exec(function(){
				done();
			});
		});
	});
});
