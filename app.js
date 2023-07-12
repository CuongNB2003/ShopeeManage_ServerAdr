var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var staffRouter = require('./routes/staff');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var apiRouter = require('./routes/api')
var checkLogin = require('./middleware/check');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'CUONGPROFULLSTACKDEVOLOPERHEHECUONGSIUCAPVIPPROHIHICUONGSOCODEHMMCUONGVOTRI',
  resave: true,
  saveUninitialized: true
}))

app.use('/', indexRouter);
app.use('/user', 
            checkLogin.login, 
            userRouter);
app.use('/staff', 
            checkLogin.login, 
            staffRouter);
app.use('/product', 
            checkLogin.login, 
            productRouter);
app.use('/category', 
            checkLogin.login, 
            categoryRouter);
app.use('/api', apiRouter);


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
  // code api
  if(req.originalUri.indexOf('/api') == 0){
    res.json(
      {
        msg : err.message
      }
    )
  }else{
    res.render('error')
  }

  res.render('error');
});

module.exports = app;
