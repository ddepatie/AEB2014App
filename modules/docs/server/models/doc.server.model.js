'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Doc Schema
 */
var DocSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Doc name',
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

mongoose.model('Doc', DocSchema);