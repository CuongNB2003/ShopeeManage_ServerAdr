var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller');
var multer = require('multer')
var uploadAvata = multer({dest: './tmp'})
var middleware = require('../middleware/check_login');
router.use(middleware.dieuHuongDangNhap)

router.get('/', userCtrl.listUser)
router.get('/filter/:role', userCtrl.listUser)
router.get('/sort/:username', userCtrl.listUser)
router.get('/search', userCtrl.listUser)

router.get('/add', userCtrl.addUser)
router.post('/add', uploadAvata.single("avata"), userCtrl.addUser)

router.get('/edit/:iduser', userCtrl.editUser)
router.post('/edit/:iduser', uploadAvata.single("avata"), userCtrl.editUser)

router.get('/delete/:iduser', userCtrl.deleteUser)

router.get('/block', userCtrl.blockUser)

module.exports = router;