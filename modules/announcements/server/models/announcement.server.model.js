'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Announcement Schema
 */
var AnnouncementSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Announcement name',
		trim: true
	},
	text: {
		type: String,
		default: '',
		required: 'Please fill Announcement text',
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

mongoose.model('Announcement', AnnouncementSchema);