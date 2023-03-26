var express = require('express');
var router = express.Router();
var sanphamCtrl = require('../controller/sanpham.controller');

router.get('/', sanphamCtrl.listSanPham)

router.get('/add', sanphamCtrl.addSanPham)

router.get('/edit', sanphamCtrl.editSanPham)

module.exports = router;