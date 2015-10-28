'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Doc = mongoose.model('Doc'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Doc
 */
exports.create = function(req, res) {
	var doc = new Doc(req.body);
	doc.user = req.user;

	doc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(doc);
		}
	});
};

/**
 * Show the current Doc
 */
exports.read = function(req, res) {
	res.jsonp(req.doc);
};

/**
 * Update a Doc
 */
exports.update = function(req, res) {
	var doc = req.doc ;

	doc = _.extend(doc , req.body);

	doc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(doc);
		}
	});
};

/**
 * Delete an Doc
 */
exports.delete = function(req, res) {
	var doc = req.doc ;

	doc.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(doc);
		}
	});
};

/**
 * List of Docs
 */
exports.list = function(req, res) { Doc.find().sort('-created').populate('user', 'displayName').exec(function(err, docs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(docs);
		}
	});
};

/**
 * Doc middleware
 */
exports.docByID = function(req, res, next, id) { Doc.findById(id).populate('user', 'displayName').exec(function(err, doc) {
		if (err) return next(err);
		if (! doc) return next(new Error('Failed to load Doc ' + id));
		req.doc = doc ;
		next();
	});
};