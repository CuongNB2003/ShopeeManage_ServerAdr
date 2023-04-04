var express = require('express');
var router = express.Router();
var theloaiCtrl = require('../controller/theloai.controller');

router.get('/', theloaiCtrl.listTheLoai)

router.get('/add', theloaiCtrl.addTheLoai)
router.post('/add', theloaiCtrl.addTheLoai)


router.get('/edit/:idtl', theloaiCtrl.editTheLoai)
router.post('/edit/:idtl', theloaiCtrl.editTheLoai)

router.get('/delete/:idtl', theloaiCtrl.deleteTheLoai)


module.exports = router