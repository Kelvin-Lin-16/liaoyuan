const log = require('../../log');
const _ = require('lodash');
const Url = require('./api/url/url.model');

module.exports = function(app) {

    // Log Requests
    app.use(function(req, res, next) {
        log.debug(req.method, req.url);
        if (!_.isEmpty(req.params)) {
            log.debug('[routes: Params>>]', JSON.stringify(req.params));
        }
        if (!_.isEmpty(req.body)) {
            log.debug('[routes: Body>>]', JSON.stringify(req.body));
        }
        next();
    });

    // API Endpoint Routes
    app.use('/api/url', require('./api/url'));


    app.route('/:shortenedURL').get(function(req, res) {
        var shortenedURL = req.params.shortenedURL;
        //Check if the url is empty
        if (_.isEmpty(shortenedURL)) {
            log.error(("[routes: shortenedURL]", "URL not found"));
            return res.status(404).send();
        }
        Url.findOne({
            shortURL: shortenedURL
        }, function(err, url_) {
            if (url_ && !_.isEmpty(url_.longURL)) {
                res.writeHead(301, {
                    'Location': url_.longURL
                });
                res.end();
            }
        });
    });

    app.route('/').get(function(req, res) {
        res.render('index', {
            title: 'Express'
        });
    });

};