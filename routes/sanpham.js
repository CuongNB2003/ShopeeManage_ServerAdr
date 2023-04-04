var express = require('express');
var router = express.Router();
var sanphamCtrl = require('../controller/sanpham.controller');

router.get('/', sanphamCtrl.listSanPham)

router.get('/add', sanphamCtrl.addSanPham)
router.post('/add', sanphamCtrl.addSanPham)

router.get('/edit/:idsp', sanphamCtrl.editSanPham)
router.post('/edit/:idsp', sanphamCtrl.editSanPham)

router.get('/delete/:idsp', sanphamCtrl.deleteSanPham)

router.get('/chitiet/:idsp', sanphamCtrl.chitietSanPham)


module.exports = router;