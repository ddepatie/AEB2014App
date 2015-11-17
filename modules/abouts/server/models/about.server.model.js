'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * About Schema
 */
var AboutSchema = new Schema({
	text: {
		type: String,
		default: '',
		required: 'Please fill About section text',
		trim: true
	},
	imageUrl: {
		type: String,
		default: 'modules/users/client/img/profile/default.png'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('About', AboutSchema);