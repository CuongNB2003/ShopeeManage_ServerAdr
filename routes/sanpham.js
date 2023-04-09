var express = require('express');
var router = express.Router();
var sanphamCtrl = require('../controller/sanpham.controller');
var multer = require('multer')
var uploadImg = multer({dest: './tmp'})
var checkLogin = require('../middleware/check_login');

router.get('/', checkLogin.yeuCauDangNhap, sanphamCtrl.listSanPham)
router.get('/filter/:idtl', sanphamCtrl.listSanPham)
router.get('/sort/:price', sanphamCtrl.listSanPham)
router.get('/search', sanphamCtrl.listSanPham)

router.get('/add', checkLogin.yeuCauDangNhap, sanphamCtrl.addSanPham)
router.post('/add', uploadImg.single("image"), sanphamCtrl.addSanPham)

router.get('/edit/:idsp', checkLogin.yeuCauDangNhap, sanphamCtrl.editSanPham)
router.post('/edit/:idsp', uploadImg.single("image"), sanphamCtrl.editSanPham)

router.get('/delete/:idsp', checkLogin.yeuCauDangNhap, sanphamCtrl.deleteSanPham)

router.get('/chitiet/:idsp', checkLogin.yeuCauDangNhap, sanphamCtrl.chitietSanPham)

module.exports = router;