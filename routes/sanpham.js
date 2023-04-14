var express = require('express');
var router = express.Router();
var sanphamCtrl = require('../controller/sanpham.controller');
var multer = require('multer')
var uploadImg = multer({dest: './tmp'})
var middleware = require('../middleware/check_login');
router.use(middleware.dieuHuongDangNhap)

router.get('/', sanphamCtrl.listSanPham)
router.get('/filter/:idtl',  sanphamCtrl.listSanPham)
router.get('/sort/:price', sanphamCtrl.listSanPham)
router.get('/search', sanphamCtrl.listSanPham)

router.get('/add', sanphamCtrl.addSanPham)
router.post('/add', uploadImg.single("image"), sanphamCtrl.addSanPham)

router.get('/edit/:idsp', sanphamCtrl.editSanPham)
router.post('/edit/:idsp', uploadImg.single("image"), sanphamCtrl.editSanPham)

router.get('/delete/:idsp', sanphamCtrl.deleteSanPham)

router.get('/chitiet/:idsp', sanphamCtrl.chitietSanPham)

module.exports = router;