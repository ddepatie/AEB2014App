'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Saved doc Schema
 */
var SavedDocSchema = new Schema({
	doc: {
		type: Schema.ObjectId,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('SavedDoc', SavedDocSchema);