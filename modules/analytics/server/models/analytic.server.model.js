'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Analytic Schema
 */
var AnalyticSchema = new Schema({
	doc: {
		type: Schema.Types.ObjectId
	},
	title: {
		type: String,
		default: '',
		required: 'Please fill Doc title',
		trim: true
	},
	tags: {
		type: Schema.Types.Mixed,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Analytic', AnalyticSchema);