'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Savedoc = mongoose.model('Savedoc'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Savedoc
 */
exports.create = function(req, res) {
	var savedoc = new Savedoc(req.body);
	savedoc.user = req.user;

	savedoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(savedoc);
		}
	});
};

/**
 * Show the current Savedoc
 */
exports.read = function(req, res) {
	res.jsonp(req.savedoc);
};

/**
 * Update a Savedoc
 */
exports.update = function(req, res) {
	var savedoc = req.savedoc ;

	savedoc = _.extend(savedoc , req.body);

	savedoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(savedoc);
		}
	});
};

/**
 * Delete an Savedoc
 */
exports.delete = function(req, res) {
	var savedoc = req.savedoc ;

	savedoc.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(savedoc);
		}
	});
};

/**
 * List of Savedocs
 */
exports.list = function(req, res) { Savedoc.find().sort('-created').populate('user', 'displayName').exec(function(err, savedocs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(savedocs);
		}
	});
};

/**
 * Savedoc middleware
 */
exports.savedocByID = function(req, res, next, id) { Savedoc.findById(id).populate('user', 'displayName').exec(function(err, savedoc) {
		if (err) return next(err);
		if (! savedoc) return next(new Error('Failed to load Savedoc ' + id));
		req.savedoc = savedoc ;
		next();
	});
};