const log = require('../../log');
const _ = require('lodash');
const Url = require('./api/url/url.model');

module.exports = function(app) {

  // Log Requests
  app.use(function(req, res, next) {
    log.debug(req.method, req.url);
    if (!_.isEmpty(req.params)) {
      log.debug('>Params:', JSON.stringify(req.params));
    }
    if (!_.isEmpty(req.body)) {
      log.debug('>Body:', JSON.stringify(req.body));
    }
    next();
  });

  // API Endpoint Routes
  app.use('/api/url', require('./api/url'));

  app.route('/:shortenedURL').get(function(req, res) {
    var shortenedURL=req.params.shortenedURL;
    log.debug("shortenedURL", shortenedURL);
    Url.findOne({shortURL:shortenedURL},function(err,url_){
        log.debug("longURL",url_.longURL);
        //todo: validate lognURL
      res.writeHead(302, {
        'Location': "http://"+url_.longURL
      });
      res.end();
    })
  });

  app.route('/').get(function(req, res) {
    res.render('index', { title: 'Express' });
  });

};