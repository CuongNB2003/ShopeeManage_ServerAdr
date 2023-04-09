var express = require('express');
var router = express.Router();
var theloaiCtrl = require('../controller/theloai.controller');
var checkLogin = require('../middleware/check_login');

router.get('/', checkLogin.yeuCauDangNhap, theloaiCtrl.listTheLoai)

router.get('/add', checkLogin.yeuCauDangNhap, theloaiCtrl.addTheLoai)
router.post('/add', checkLogin.yeuCauDangNhap, theloaiCtrl.addTheLoai)

router.get('/edit/:idtl', checkLogin.yeuCauDangNhap, theloaiCtrl.editTheLoai)
router.post('/edit/:idtl', checkLogin.yeuCauDangNhap, theloaiCtrl.editTheLoai)

router.get('/delete/:idtl', checkLogin.yeuCauDangNhap, theloaiCtrl.deleteTheLoai)


module.exports = router