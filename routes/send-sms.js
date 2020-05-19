var express = require('express');
var router = express.Router();
var Sender = require('../services/sms-sender');
var sender = new Sender();

/* 
 * This is a support route useful to send SMS from browser
 */
router.get('/', function(req, res, next) {
    console.log(`Send SMS from ${req.query.from} to ${req.query.to} with text: ${req.query.text}`);
    sender.sendSMS(req.query.from, req.query.to, req.query.text);
    res.status(200).send('ok');
});

module.exports = router;