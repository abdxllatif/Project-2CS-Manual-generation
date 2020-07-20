var createError = require('http-errors');
var express = require('express');
var path = require('path');
var generalRouter = require('./routes/general');

var Sequelize = require('sequelize');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/',  generalRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = 3000;
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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
module.exports = app;
