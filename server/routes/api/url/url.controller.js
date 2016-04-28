/**
 * Created by KelvinLin on 4/27/16.
 */
var log = require('../../../../log');
var _ = require('lodash');
var Url = require('./url.model');

/**
 *
 * @param req
 * @param res
 */
exports.findAllURLs = function (req, res) {
    Url
        .find({})
        .sort({ created: -1 })
        .exec(function (err, urls) {
            if (err){
                log.error(err);
                return res.status(500).send(err);
            }

            return res.status(200).send(urls);
        });
}

/**
 *
 * @param req
 * @param res
 */
exports.createShortenURL = function (req, res) {
    //validating fields
    var longUrl = req.body.originalURL;
    log.debug("longUrl", longUrl);
    //todo:validate url format
    if(_.isEmpty(longUrl)){
        log.error('InvalidParams');
        return res.status(422).send('InvalidParams');
    }

    var url = new Url({
        longURL: longUrl,
        shortURL:longUrl,
        created: new Date().toISOString()
    });
    url.save(function (err, url_) {
        if(err){
            log.error(err);
        }
        res.status(200).send('SUC');
    });
}