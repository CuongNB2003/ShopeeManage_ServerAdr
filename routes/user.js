var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller');
var multer = require('multer')
var uploadAvata = multer({dest: './tmp'})
var checkLogin = require('../middleware/check_login');

router.get('/', checkLogin.yeuCauDangNhap, userCtrl.listUser)
router.get('/filter/:role', checkLogin.yeuCauDangNhap, userCtrl.listUser)
router.get('/sort/:username', checkLogin.yeuCauDangNhap, userCtrl.listUser)
router.get('/search', checkLogin.yeuCauDangNhap, userCtrl.listUser)

router.get('/add', checkLogin.yeuCauDangNhap, userCtrl.addUser)
router.post('/add', checkLogin.yeuCauDangNhap, uploadAvata.single("avata"), userCtrl.addUser)

router.get('/edit/:iduser', checkLogin.yeuCauDangNhap, userCtrl.editUser)
router.post('/edit/:iduser', checkLogin.yeuCauDangNhap, uploadAvata.single("avata"), userCtrl.editUser)

router.get('/delete/:iduser', checkLogin.yeuCauDangNhap, userCtrl.deleteUser)

router.get('/block', checkLogin.yeuCauDangNhap, userCtrl.blockUser)

module.exports = router;