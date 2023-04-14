var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var sanphamRouter = require('./routes/sanpham');
var theloaiRouter = require('./routes/theloai');
var ApiRouter = require('./routes/api');
var checkDangNhap = require('./middleware/check_login')


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
  secret: 'NDFHnafidsfnadhf23nfsdhf23njNDFInn34ddfasdfsadfasdjnfjadfadsfasdfasdfasfAAA',
  resave: true,
  saveUninitialized: true
}))


app.use('/', 
    indexRouter);
app.use('/user',
    checkDangNhap.yeuCauDangNhap, 
    userRouter);
app.use('/category',
    checkDangNhap.yeuCauDangNhap, 
    theloaiRouter);
app.use('/product',
    checkDangNhap.yeuCauDangNhap, 
    sanphamRouter);
app.use('/api', 
    ApiRouter);

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

  // địa chỉ truy cập bằng api: /api/xxxx
  if(req.originalUrl.indexOf('/api') == 0){
    res.json(
      {
        msg: err.message
      }
    );
  }else{
    res.render('error');
  }
});

module.exports = app;
