'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	SavedDoc = mongoose.model('SavedDoc');

/**
 * Globals
 */
var user, savedDoc;

/**
 * Unit tests
 */
describe('Saved doc Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			savedDoc = new SavedDoc({
				name: 'Saved doc Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return savedDoc.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			savedDoc.name = '';

			return savedDoc.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		SavedDoc.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
