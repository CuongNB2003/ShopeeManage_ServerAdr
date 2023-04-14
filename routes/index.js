var express = require('express');
var router = express.Router();
var homeCtrl = require('../controller/home.controller');
var middleware = require('../middleware/check_login');

router.get('/', middleware.dieuHuongDangNhap, homeCtrl.index)

router.get('/login', homeCtrl.dangNhap);
router.post('/login', homeCtrl.dangNhap);

router.get('/change-pass', middleware.dieuHuongDangNhap, homeCtrl.doiPass);
router.post('/change-pass', middleware.dieuHuongDangNhap, homeCtrl.doiPass);

router.get('/logout', middleware.dieuHuongDangNhap, homeCtrl.dangXuat);

module.exports = router;
