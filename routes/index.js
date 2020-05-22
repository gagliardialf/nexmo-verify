var express = require('express');

module.exports = function () {
    this.router = express.Router();

    /* GET home page. */
    this.router.get('/', function(req, res, next) {
        console.log(JSON.stringify(req.session))
        /*
            If there is a session for the user, the `index.html`
            page will display the number that was used to log
            in. If not, it will prompt them to log in.
        */
        if (!req.session.user) {
            console.log('User is NOT logged');
            res.render('index', { title: process.env.NEXMO_BRAND_NAME });
        } else {
            console.log('User is logged');
            res.render('index', {            
                number: req.session.user.number,
                title: process.env.NEXMO_BRAND_NAME
            });
        }
    });
}