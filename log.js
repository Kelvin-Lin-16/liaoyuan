/**
 * Created by KelvinLin on 4/27/16.
 */
'use strict';

var bunyan = require('bunyan');
var config = require('./server/config');
var log = bunyan.createLogger(config.log);

module.exports = log;