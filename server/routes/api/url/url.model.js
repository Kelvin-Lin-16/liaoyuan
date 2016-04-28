'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UrlSchema = new Schema({
    longURL: {
        type: String,
        lowercase: true,
        required: true
    },
    shortURL: {
        type: String,
        lowercase: true,
        required: true
    },
    created: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Url', UrlSchema);