'use strict'

var express = require('express'),
    controller = require('./url.controller');

var router = express.Router();

router.get('/', controller.findAllURLs);

router.post('/', controller.createShortenURL);

module.exports = router;