'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	SavedDoc = mongoose.model('SavedDoc'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Saved doc
 */
exports.create = function(req, res) {
	var savedDoc = new SavedDoc(req.body);
	savedDoc.user = req.user;

	savedDoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(savedDoc);
		}
	});
};

/**
 * Show the current Saved doc
 */
exports.read = function(req, res) {
	res.jsonp(req.savedDoc);
};

/**
 * Update a Saved doc
 */
exports.update = function(req, res) {
	var savedDoc = req.savedDoc ;

	savedDoc = _.extend(savedDoc , req.body);

	savedDoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(savedDoc);
		}
	});
};

/**
 * Delete an Saved doc
 */
exports.delete = function(req, res) {
	var savedDoc = req.savedDoc ;

	savedDoc.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(savedDoc);
		}
	});
};

/**
 * List of Saved docs
 */
exports.list = function(req, res) { SavedDoc.find().sort('-created').populate('user', 'displayName').exec(function(err, savedDocs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(savedDocs);
		}
	});
};

/**
 * Saved doc middleware
 */
exports.savedDocByID = function(req, res, next, id) { SavedDoc.findById(id).populate('user', 'displayName').exec(function(err, savedDoc) {
		if (err) return next(err);
		if (! savedDoc) return next(new Error('Failed to load Saved doc ' + id));
		req.savedDoc = savedDoc ;
		next();
	});
};