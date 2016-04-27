'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UrlSchema = new Schema({
    _id: {type: String, index: true},
    longUrl: {type: String},
    shortUrl: {type: String},
    created: {type: Date}
});

module.exports = mongoose.model('Url', UrlSchema);