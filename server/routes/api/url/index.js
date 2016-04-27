'use strict'

var express = require('express'),
    controller = require('./url.controller');

var router = express.Router();

router.get('/', controller.findAllURL);

router.get('/:url', controller.visitURL);

router.post('/', controller.createShortenURL);

module.exports = router;