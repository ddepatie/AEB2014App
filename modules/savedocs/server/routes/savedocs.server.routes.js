'use strict';

module.exports = function(app) {
	var savedocs = require('../controllers/savedocs.server.controller');
	var savedocsPolicy = require('../policies/savedocs.server.policy');

	// Savedocs Routes
	app.route('/api/savedocs').all()
		.get(savedocs.list).all(savedocsPolicy.isAllowed)
		.post(savedocs.create);

	app.route('/api/savedocs/:savedocId').all(savedocsPolicy.isAllowed)
		.get(savedocs.read)
		.put(savedocs.update)
		.delete(savedocs.delete);

	// Finish by binding the Savedoc middleware
	app.param('savedocId', savedocs.savedocByID);
};