const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const controllers = require('./controllers');
const utilities = require('./utils');
const { db } = require("./models");

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(utilities.globalRequestInterceptor.requestInterceptor);
app.use((req, res, next) => {
  app.txId = req.txId;
  next()
});

app.database = db;
app.utils = utilities;

app.use('/api/', controllers(app));

app.use(utilities.globalErrorHandler);
app.use(utilities.globalReponseHandler.responseHandler);


process.on('unhandledRejection', (reason) => {
  console.log('********************************');
  console.log('Reason: ' + reason);
  console.log('********************************');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
