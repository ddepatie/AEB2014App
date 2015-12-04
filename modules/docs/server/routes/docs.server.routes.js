'use strict';

module.exports = function(app) {
	var docs = require('../controllers/docs.server.controller');
	var docsPolicy = require('../policies/docs.server.policy');

	// Docs Routes
	app.route('/api/docs').all()
		.get(docs.list).all(docsPolicy.isAllowed)
		.post(docs.create);

	app.route('/api/docs/:docId').all(docsPolicy.isAllowed)
		.get(docs.read)
		.put(docs.update)
		//.put(docs.updateViewCount)
		.delete(docs.delete);
	app.route('/api/docs/:docId/viewCount').all(docsPolicy.isAllowed)
		.put(docs.updateViewCount);
	// Finish by binding the Doc middleware
	app.param('docId', docs.docByID);
};