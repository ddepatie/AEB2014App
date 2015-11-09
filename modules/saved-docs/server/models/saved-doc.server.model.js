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
		type: Schema.Types.ObjectId
	},
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
		required: 'Please fill Doc thumbnail_image',
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

mongoose.model('SavedDoc', SavedDocSchema);