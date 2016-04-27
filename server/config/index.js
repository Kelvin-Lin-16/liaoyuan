'use strict';

var _ = require('lodash');

var all = {

    // Server port
    port: process.env.PORT || 9000,

    log: {
        name: 'liaoyuan',
        streams: [{
                level: 'info', //error
                stream: process.stdout
            },
            {
                level: 'error',
                path: './server/logs/liaoyuan',
                period: '1d',
                count: 90 //Generate daily error logs
            }]
    },

    mongo: {
        uri: 'mongodb://localhost/liaoyuan',
        options: {
            db: {
                safe: true
            }
        }
    }
};

module.exports = all;