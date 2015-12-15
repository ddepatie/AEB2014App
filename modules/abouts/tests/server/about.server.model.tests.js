'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	About = mongoose.model('About');

/**
 * Globals
 */
var user, about;

/**
 * Unit tests
 */
describe('About Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			roles: ['user', 'admin']
		});

		user.save(function() { 
			about = new About({
				name: 'About Name',
				text: 'text',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return about.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			about.name = '';

			return about.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		About.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
