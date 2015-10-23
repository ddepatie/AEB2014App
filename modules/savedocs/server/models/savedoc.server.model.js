'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Savedoc Schema
 */
var SavedocSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Savedoc name',
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

mongoose.model('Savedoc', SavedocSchema);