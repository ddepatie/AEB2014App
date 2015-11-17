'use strict';

module.exports = function(app) {
	var savedDocs = require('../controllers/saved-docs.server.controller');
	var savedDocsPolicy = require('../policies/saved-docs.server.policy');

	// Saved docs Routes
	app.route('/api/saved-docs').all()
		.get(savedDocs.list).all(savedDocsPolicy.isAllowed)
		.post(savedDocs.create);

	app.route('/api/saved-docs/:savedDocId').all(savedDocsPolicy.isAllowed)
		.get(savedDocs.read)
		.put(savedDocs.update)
		.delete(savedDocs.delete);

	// Finish by binding the Saved doc middleware
	app.param('savedDocId', savedDocs.savedDocByID);
};