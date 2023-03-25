var express = require('express');
var router = express.Router();
var loginCtrl = require('../controller/login.controller');

router.get('/', loginCtrl.dangNhap)

module.exports = router;