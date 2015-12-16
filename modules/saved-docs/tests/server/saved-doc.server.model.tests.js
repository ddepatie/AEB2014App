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
				title: 'something',
				description: 'something',
				type: 'something',
				url: 'something',
				thumbnail_image: 'something',
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

		it('should be able to show an error when try to save without title', function(done) { 
			savedDoc.title = '';

			return savedDoc.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without description', function(done) { 
			savedDoc.description = '';

			return savedDoc.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without type', function(done) { 
			savedDoc.type = '';

			return savedDoc.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without url', function(done) { 
			savedDoc.url = '';

			return savedDoc.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without thumbnail_image', function(done) { 
			savedDoc.thumbnail_image = '';

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
