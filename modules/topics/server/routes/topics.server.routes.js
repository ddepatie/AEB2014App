'use strict';

module.exports = function(app) {
	var topics = require('../controllers/topics.server.controller');
	var topicsPolicy = require('../policies/topics.server.policy');

	// Topics Routes
	app.route('/api/topics').all()
		.get(topics.list).all(topicsPolicy.isAllowed)
		.post(topics.create);

	app.route('/api/topics/:topicId').all(topicsPolicy.isAllowed)
		.get(topics.read)
		.put(topics.update)
		.delete(topics.delete);

	// Finish by binding the Topic middleware
	app.param('topicId', topics.topicByID);
};