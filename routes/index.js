var express = require('express');
var router = express.Router();
var homeCtrl = require('../controller/home.controller');

router.get('/', homeCtrl.index)

router.get('/login', homeCtrl.dangNhap);

router.get('/doipass', homeCtrl.doiPass);

module.exports = router;
