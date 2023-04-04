var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller');

router.get('/', userCtrl.listUser)

router.get('/add', userCtrl.addUser)
router.post('/add', userCtrl.addUser)

router.get('/edit/:iduser', userCtrl.editUser)
router.post('/edit/:iduser', userCtrl.editUser)

router.get('/delete/:iduser', userCtrl.deleteUser)

router.get('/block', userCtrl.blockUser)

module.exports = router;