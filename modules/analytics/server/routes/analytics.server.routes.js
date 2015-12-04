'use strict';

module.exports = function(app) {
	var analytics = require('../controllers/analytics.server.controller');
	var analyticsPolicy = require('../policies/analytics.server.policy');

	// Analytics Routes
	app.route('/api/analytics').all()
		.get(analytics.list).all(analyticsPolicy.isAllowed)
		.post(analytics.create);

	app.route('/api/analytics/:analyticId').all(analyticsPolicy.isAllowed)
		.get(analytics.read)
		.put(analytics.update)
		.delete(analytics.delete);

	// Finish by binding the Analytic middleware
	app.param('analyticId', analytics.analyticByID);
};