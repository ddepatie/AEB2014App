'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Topic = mongoose.model('Topic');

/**
 * Globals
 */
var user, topic;

/**
 * Unit tests
 */
describe('Topic Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			usertopic: 'usertopic',
			password: 'password'
		});

		user.save(function() { 
			topic = new Topic({
				topic: 'Topic Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return topic.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without topic', function(done) { 
			topic.topic = '';

			return topic.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Topic.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
