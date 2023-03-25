var express = require('express');
var router = express.Router();
var theloaiCtrl = require('../controller/theloai.controller');

router.get('/', theloaiCtrl.listTheLoai)

router.get('/add', theloaiCtrl.addTheLoai)

module.exports = router