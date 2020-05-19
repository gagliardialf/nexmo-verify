var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
    console.log(req.body);
    res.status(200).send('ok');
});

module.exports = router;