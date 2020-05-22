const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET
    }, {
        debug: true
    });
const Proxy = require('./services/sms-proxy'),
  smsProxy = new Proxy(nexmo);
const Sender = require('./services/sms-sender'),
  sender = new Sender(nexmo);

const IndexRouter = require('./routes/index'),
    indexRoute = new IndexRouter();
const UsersRouter = require('./routes/users'),
    usersRoute = new UsersRouter(nexmo, smsProxy);
const IncomingSmsRouter = require('./routes/incoming-sms'),
    incomingSmsRoute = new IncomingSmsRouter(smsProxy);
const SendSmsRouter = require('./routes/send-sms'),
    sendSmsRoute = new SendSmsRouter(sender);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
  secret: 'loadsofrandomstuff',
  resave: false,
  saveUninitialized: true
}));
app.use('/', indexRoute.router);
app.use('/users', usersRoute.router);
app.use('/incoming-sms', incomingSmsRoute.router);
app.use('/send-sms', sendSmsRoute.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
