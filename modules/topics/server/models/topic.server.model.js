'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Topic Schema
 */
var TopicSchema = new Schema({
	topic: {
		type: String,
		default: '',
		required: 'Please fill Topic name',
		trim: true
	}
});

mongoose.model('Topic', TopicSchema);