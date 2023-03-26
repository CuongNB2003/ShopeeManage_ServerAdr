var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller');

router.get('/', userCtrl.listUser)

router.get('/block', userCtrl.blockUser)

module.exports = router;