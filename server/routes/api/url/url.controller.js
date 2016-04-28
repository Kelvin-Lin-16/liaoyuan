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
exports.findAllURLs = function(req, res) {
    Url.find({}).sort({
        created: -1
    }).exec(function(err, urls) {
        if (err) {
            log.error("[url.controller: findAllURLs]", err);
            return res.status(500).send(err);
        }

        return res.status(200).send(urls);
    });
}

/**
 * Generator for 5-Digit string.
 * @returns {string}
 */

function trans() {
    var char = '';
    for (var i = 0; i < 5; i++) {
        var index = Math.round(Math.random() * 2);
        switch (index) {
            case 0:
                char = char + String.fromCharCode(Math.floor(Math.random() * 26) + "A".charCodeAt(0));
                break;
            case 1:
                char = char + String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));
                break;
            default:
                char = char + Math.floor((Math.random() * 9)).toString();
                break;
        }
    }
    log.debug("[url.controller: trans]", char);
    return char;
}


/**
 *
 * @param req
 * @param res
 */
exports.createShortenURL = function(req, res) {

    const longUrl = req.body.originalURL;

    //Check if the url is empty
    if (_.isEmpty(longUrl)) {
        log.debug(("[url.controller: createShortenURL]", longUrl));
        return res.status(422).send('InvalidParams');
    }

    //Check if the url is a valid url address
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    if (!regexp.test(longUrl)) {
        log.debug(("[url.controller: createShortenURL]", longUrl));
        return res.status(422).send('InvalidParams');
    }


    //Find the url with the given long url
    Url.findOne({
        longURL: longUrl
    }, function(err, url_) {
        if (err) {
            log.error(("[url.controller: createShortenURL]", err));
            return res.status(500).send(err);
        }
        if (url_ && !_.isEmpty(url_.shortURL)) {
            return res.status(200).send(url_.shortURL);
        }
        var shortURL = trans();
        var url = new Url({
            longURL: longUrl,
            shortURL: shortURL,
            created: new Date().toISOString()
        });
        url.save(function(err, url_) {
            if (err) {
                log.error(("[url.controller: createShortenURL]", err));
                return res.status(500).send(err);
            }
            return res.status(201).send(url_.shortURL);
        });
    });
}