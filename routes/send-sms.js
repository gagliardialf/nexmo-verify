var express = require('express');

module.exports = function (sender) {
    this.router = express.Router();

    /* 
    * This is a support route useful to send SMS from browser
    */
   this.router.get('/', function(req, res, next) {
        console.log(`Send SMS from ${req.query.from} to ${req.query.to} with text: ${req.query.text}`);
        sender.sendSMS(req.query.from, req.query.to, req.query.text);
        res.status(200).send('ok');
    });
}