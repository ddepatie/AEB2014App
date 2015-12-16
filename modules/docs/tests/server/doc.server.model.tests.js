'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Doc = mongoose.model('Doc');

/**
 * Globals
 */
var user, doc;

/**
 * Unit tests
 */
describe('Doc Model Unit Tests:', function() {
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
			doc = new Doc({
				title: 'Doc Name',
				description: 'Doc Name',
				type: 'Doc Name',
				url: 'Doc Name',
				thumbnail_image: 'Doc Name',
				tags: ['Doc Name'],
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return doc.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			doc.name = '';

			return doc.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Doc.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
