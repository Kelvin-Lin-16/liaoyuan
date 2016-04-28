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

function trans() {
    var char='';
    for(var i =0;i<5;i++){
        var index = Math.round( Math.random() * 2);
        switch (index){
            case 0:
                char =char+String.fromCharCode(Math.floor( Math.random() * 26) + "A".charCodeAt(0));
                break;
            case 1:
                char =char+String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0));
                break;
            default:
                log.debug("number",Math.floor((Math.random() * 9)).toString());
                char =char + Math.floor((Math.random() * 9)).toString();
                break;
        }
    }
    return char;
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
    var shortURL= trans();
    var url = new Url({
        longURL: longUrl,
        shortURL:shortURL,
        created: new Date().toISOString()
    });
    url.save(function (err, url_) {
        if(err){
            log.error(err);
        }
        res.status(200).send(shortURL);
    });
}