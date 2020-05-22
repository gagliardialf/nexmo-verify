var express = require('express');

module.exports = function (nexmo, smsProxy) {
    this.router = express.Router();

    this.router.post('/verify', (req, res) => {
        // Start the verification process
        verifyRequestNumber = req.body.number;
        nexmo.verify.request({
            number: verifyRequestNumber,
            brand: process.env.NEXMO_BRAND_NAME
        }, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`result: ${JSON.stringify(result)}`);
                if (result.status == 0) {
                    verifyRequestId = result.request_id;
                    console.log(`request_id: ${verifyRequestId}`);
                    /* 
                    Redirect to page where the user can 
                    enter the code that they received
                    */
                    res.render('enter-code', { request_id: verifyRequestId, number: verifyRequestNumber});
                } else {
                    res.render('index', { title: process.env.NEXMO_BRAND_NAME });
                }
            }
        });
    });

    this.router.post('/check-code', (req, res) => {
        // Check the code provided by the user
        nexmo.verify.check({
            request_id: req.body.request_id,
            code: req.body.code
        }, (err, result) => {
            if (err) {
                console.error(err);
                res.redirect('/')
            } else {
                console.log(`result: ${JSON.stringify(result)}`);
                if (result.status == 0) {
                    /* 
                        User provided correct code,
                        so create a session for that user
                    */
                    req.session.user = {
                        number: req.body.number
                    }
                    req.session.save(function(err) {
                        smsProxy.addUser(req.body.number)
                        // session saved
                        res.redirect('/')
                    })
                } else {
                    res.redirect('/')
                }
            }
        });
    });

    this.router.get('/logout', (req, res) => {
        smsProxy.removeUser(req.session.user.number);
        req.session.destroy();
        res.redirect('/');
    });
}