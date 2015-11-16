'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tag Schema
 */
var TagSchema = new Schema({
	tag: {
		type: String,
		default: '',
		required: 'Please fill Tag name',
		trim: true
	},
	topicId: {
		type: Schema.ObjectId,
		ref: 'Topic'
	}
});

mongoose.model('Tag', TagSchema);