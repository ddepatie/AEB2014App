'use strict';

module.exports = function(app) {
	var tags = require('../controllers/tags.server.controller');
	var tagsPolicy = require('../policies/tags.server.policy');

	// Tags Routes
	app.route('/api/tags').all()
		.get(tags.list).all(tagsPolicy.isAllowed)
		.post(tags.create);

	app.route('/api/tags/:tagId').all(tagsPolicy.isAllowed)
		.get(tags.read)
		.put(tags.update)
		.delete(tags.delete);

	// Finish by binding the Tag middleware
	app.param('tagId', tags.tagByID);
};