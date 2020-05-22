var express = require('express');
module.exports = function (proxy) {
    this.router = express.Router();
    
    this.router.post('/', function(req, res, next) {
        console.log(`Incoming sms from ${req.body.msisdn} with text: ${req.body.text}`);
        proxy.proxySms(req.body.msisdn, req.body.text);
        res.status(200).send('ok');
    });
}