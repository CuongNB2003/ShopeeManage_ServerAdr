var express = require('express');
var router = express.Router();
var homeCtrl = require('../controller/home.controller');
var checkLogin = require('../middleware/check_login');

router.get('/', checkLogin.yeuCauDangNhap, homeCtrl.index)

router.get('/login', homeCtrl.dangNhap);
router.post('/login', homeCtrl.dangNhap);

router.get('/doipass', checkLogin.yeuCauDangNhap, homeCtrl.doiPass);
router.post('/doipass', checkLogin.yeuCauDangNhap, homeCtrl.doiPass);

module.exports = router;
