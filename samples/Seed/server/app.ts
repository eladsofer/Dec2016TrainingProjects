import * as path from 'path';
import index from './routes/index';
import contact from './routes/contact';
import * as express from "express";
//import Express = express.Express;
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app: express.Express = express();

// view engine setup
app.set('views', path.join(__dirname, '..'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..')));

app.use('/', index);
app.use('/users', contact);

app.use(function(req, res, next) {
  res.status(404);
  res.end();
});

// error handler
app.use(function(err, req, res, next) {
  res.status(500);
  res.statusMessage = err.message;
  res.end();
});

module.exports = app;
