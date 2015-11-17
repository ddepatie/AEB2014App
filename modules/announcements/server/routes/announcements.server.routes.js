'use strict';

module.exports = function(app) {
	var announcements = require('../controllers/announcements.server.controller');
	var announcementsPolicy = require('../policies/announcements.server.policy');

	// Announcements Routes
	app.route('/api/announcements').all()
		.get(announcements.list).all(announcementsPolicy.isAllowed)
		.post(announcements.create);

	app.route('/api/announcements/:announcementId').all(announcementsPolicy.isAllowed)
		.get(announcements.read)
		.put(announcements.update)
		.delete(announcements.delete);

	// Finish by binding the Announcement middleware
	app.param('announcementId', announcements.announcementByID);
};