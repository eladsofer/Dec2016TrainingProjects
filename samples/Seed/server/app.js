"use strict";
var path = require("path");
var index_1 = require("./routes/index");
var contact_1 = require("./routes/contact");
var express = require("express");
//import Express = express.Express;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, '..'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..')));
app.use('/', index_1.default);
app.use('/users', contact_1.default);
app.use(function (req, res, next) {
    res.status(404);
    res.end();
});
// error handler
app.use(function (err, req, res, next) {
    res.status(500);
    res.statusMessage = err.message;
    res.end();
});
module.exports = app;
