'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UrlSchema = new Schema({
    longURL: {type: String},
    shortURL: {type: String},
    created: {type: Date}
});

module.exports = mongoose.model('Url', UrlSchema);