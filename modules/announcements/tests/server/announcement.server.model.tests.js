'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Announcement = mongoose.model('Announcement');

/**
 * Globals
 */
var user, announcement;

/**
 * Unit tests
 */
describe('Announcement Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			roles: ['user','admin']
		});

		user.save(function() { 
			announcement = new Announcement({
				title: 'Announcement Name',
				text: 'Announcement Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return announcement.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) { 
			announcement.title = '';

			return announcement.save(function(err) {
				should.exist(err);
				done();
			});
		});
		it('should be able to show an error when try to save without text', function(done) { 
			announcement.text = '';

			return announcement.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Announcement.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
