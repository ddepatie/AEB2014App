'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Analytic = mongoose.model('Analytic');

/**
 * Globals
 */
var user, analytic;

/**
 * Unit tests
 */
describe('Analytic Model Unit Tests:', function() {
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
			analytic = new Analytic({
				title: 'Analytic Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return analytic.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			analytic.title = '';

			return analytic.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Analytic.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
