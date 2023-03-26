var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller');

router.get('/', userCtrl.listUser)

router.get('/block', userCtrl.blockUser)

router.get('/doipass', userCtrl.doiPass)

router.get('/login', userCtrl.dangNhap)

module.exports = router;