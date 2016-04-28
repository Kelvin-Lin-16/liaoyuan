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

//Remove _id, __v from response
UrlSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        return {
            longURL:ret.longURL,
            shortURL:ret.shortURL,
            created:ret.created
        };
    }
});

module.exports = mongoose.model('Url', UrlSchema);