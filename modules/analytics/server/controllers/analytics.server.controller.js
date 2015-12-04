'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Analytic = mongoose.model('Analytic'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Analytic
 */
exports.create = function(req, res) {
	var analytic = new Analytic(req.body);
	analytic.user = req.user;

	analytic.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(analytic);
		}
	});
};

/**
 * Show the current Analytic
 */
exports.read = function(req, res) {
	res.jsonp(req.analytic);
};

/**
 * Update a Analytic
 */
exports.update = function(req, res) {
	var analytic = req.analytic ;

	analytic = _.extend(analytic , req.body);

	analytic.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(analytic);
		}
	});
};

/**
 * Delete an Analytic
 */
exports.delete = function(req, res) {
	var analytic = req.analytic ;

	analytic.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(analytic);
		}
	});
};

/**
 * List of Analytics
 */
exports.list = function(req, res) { Analytic.find().sort('-created').populate('user', 'displayName').exec(function(err, analytics) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(analytics);
		}
	});
};

/**
 * Analytic middleware
 */
exports.analyticByID = function(req, res, next, id) { Analytic.findById(id).populate('user', 'displayName').exec(function(err, analytic) {
		if (err) return next(err);
		if (! analytic) return next(new Error('Failed to load Analytic ' + id));
		req.analytic = analytic ;
		next();
	});
};