'use strict';

module.exports = function(app) {
	var feedback = require('../controllers/feedback.server.controller');
	var feedbackPolicy = require('../policies/feedback.server.policy');

	// Feedback Routes
	app.route('/api/feedback').all()
		.get(feedback.list).all(feedbackPolicy.isAllowed)
		.post(feedback.create);

	app.route('/api/feedback/:feedbackId').all(feedbackPolicy.isAllowed)
		.get(feedback.read)
		.put(feedback.update)
		.delete(feedback.delete);

	// Finish by binding the Feedback middleware
	app.param('feedbackId', feedback.feedbackByID);
};
