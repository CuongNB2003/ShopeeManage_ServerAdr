var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');
var check = require('../middleware/check');
router.use(check.login);

router.get('/', userCtrl.listUser);
router.get('/search', userCtrl.listUser)
router.get('/sort-age/:age', userCtrl.listUser)
router.get('/sort-name/:fullname', userCtrl.listUser)

router.get('/block-user/:idUser', userCtrl.blockUser)
router.get('/unblock-user/:idUser', userCtrl.unBlockUser)



module.exports = router;