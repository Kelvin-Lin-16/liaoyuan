const log = require('../../log');
const _ = require('lodash');

module.exports = function(app) {

  // Log Requests
  app.use(function(req, res, next) {
    log.debug(req.method, req.url);
    //log.debug(req.body);
    //log.debug(req.params);
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

  app.route('/').get(function(req, res) {
    res.render('index', { title: 'Express' });
  });

};