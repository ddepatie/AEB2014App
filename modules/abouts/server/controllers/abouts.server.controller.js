'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	About = mongoose.model('About'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a About
 */
exports.create = function(req, res) {
	var about = new About(req.body);
	about.user = req.user;

	about.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(about);
		}
	});
};

/**
 * Show the current About
 */
exports.read = function(req, res) {
	res.jsonp(req.about);
};

/**
 * Update a About
 */
exports.update = function(req, res) {
	var about = req.about ;

	about = _.extend(about , req.body);

	about.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(about);
		}
	});
};

/**
 * Delete an About
 */
exports.delete = function(req, res) {
	var about = req.about ;

	about.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(about);
		}
	});
};

/**
 * List of Abouts
 */
exports.list = function(req, res) { About.find().sort('-created').populate('user', 'displayName').exec(function(err, abouts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(abouts);
		}
	});
};

/**
 * About middleware
 */
exports.aboutByID = function(req, res, next, id) { About.findById(id).populate('user', 'displayName').exec(function(err, about) {
		if (err) return next(err);
		if (! about) return next(new Error('Failed to load About ' + id));
		req.about = about ;
		next();
	});
};