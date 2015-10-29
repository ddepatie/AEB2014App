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
	title: {
		type: String,
		default: '',
		required: 'Please fill Doc title',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Doc description',
		trim: true
	},
	type: {
		type: String,
		default: '',
		required: 'Please fill Doc type',
		trim: true
	},
	url: {
		type: String,
		default: '',
		required: 'Please fill Doc url',
		trim: true
	},
	thumbnail_image: {
		type: String,
		default: '',
		required: 'Please fill Doc url',
		trim: true
	},
	tags: {
		type: String,
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

mongoose.model('Doc', DocSchema);