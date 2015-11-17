'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Announcement = mongoose.model('Announcement'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Announcement
 */
exports.create = function(req, res) {
	var announcement = new Announcement(req.body);
	announcement.user = req.user;

	announcement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(announcement);
		}
	});
};

/**
 * Show the current Announcement
 */
exports.read = function(req, res) {
	res.jsonp(req.announcement);
};

/**
 * Update a Announcement
 */
exports.update = function(req, res) {
	var announcement = req.announcement ;

	announcement = _.extend(announcement , req.body);

	announcement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(announcement);
		}
	});
};

/**
 * Delete an Announcement
 */
exports.delete = function(req, res) {
	var announcement = req.announcement ;

	announcement.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(announcement);
		}
	});
};

/**
 * List of Announcements
 */
exports.list = function(req, res) { Announcement.find().sort('-created').populate('user', 'displayName').exec(function(err, announcements) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(announcements);
		}
	});
};

/**
 * Announcement middleware
 */
exports.announcementByID = function(req, res, next, id) { Announcement.findById(id).populate('user', 'displayName').exec(function(err, announcement) {
		if (err) return next(err);
		if (! announcement) return next(new Error('Failed to load Announcement ' + id));
		req.announcement = announcement ;
		next();
	});
};