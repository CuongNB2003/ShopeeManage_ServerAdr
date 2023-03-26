var express = require('express');
var router = express.Router();
var loginCtrl = require('../controller/login.controller');

router.get('/', loginCtrl.dangNhap)

router.get('/doiPass', loginCtrl.doiPass)

module.exports = router;