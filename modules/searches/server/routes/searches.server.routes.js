'use strict';

module.exports = function(app) {
	var searches = require('../controllers/searches.server.controller');
	var searchesPolicy = require('../policies/searches.server.policy');

	// Searches Routes
	app.route('/api/searches').all()
		.get(searches.list).all(searchesPolicy.isAllowed)
		.post(searches.create);

	app.route('/api/searches/:searchId').all(searchesPolicy.isAllowed)
		.get(searches.read)
		.put(searches.update)
		.delete(searches.delete);

	// Finish by binding the Search middleware
	app.param('searchId', searches.searchByID);
};