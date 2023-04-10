var express = require('express');
var router = express.Router();
var homeCtrl = require('../controller/home.controller');
var checkLogin = require('../middleware/check_login');

router.get('/', checkLogin.yeuCauDangNhap, homeCtrl.index)

router.get('/login', homeCtrl.dangNhap);
router.post('/login', homeCtrl.dangNhap);

router.get('/change-pass', checkLogin.yeuCauDangNhap, homeCtrl.doiPass);
router.post('/change-pass', checkLogin.yeuCauDangNhap, homeCtrl.doiPass);

router.get('/logout', checkLogin.yeuCauDangNhap, homeCtrl.dangXuat);

module.exports = router;
