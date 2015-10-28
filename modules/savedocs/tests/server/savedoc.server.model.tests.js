'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Savedoc = mongoose.model('Savedoc');

/**
 * Globals
 */
var user, savedoc;

/**
 * Unit tests
 */
describe('Savedoc Model Unit Tests:', function() {
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
			savedoc = new Savedoc({
				name: 'Savedoc Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return savedoc.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			savedoc.name = '';

			return savedoc.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Savedoc.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
