'use strict';

module.exports = function(app) {
	var abouts = require('../controllers/abouts.server.controller');
	var aboutsPolicy = require('../policies/abouts.server.policy');

	// Abouts Routes
	app.route('/api/abouts').all()
		.get(abouts.list).all(aboutsPolicy.isAllowed)
		.post(abouts.create);

	app.route('/api/abouts/:aboutId').all(aboutsPolicy.isAllowed)
		.get(abouts.read)
		.put(abouts.update)
		.delete(abouts.delete);

	// Finish by binding the About middleware
	app.param('aboutId', abouts.aboutByID);
};