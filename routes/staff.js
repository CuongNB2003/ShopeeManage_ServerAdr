var express = require('express');
var router = express.Router();
var staffCtrl = require('../controllers/staff.controller');
const multer = require('multer')
var uploadAvata = multer({dest : './tmp'})
var check = require('../middleware/check');
router.use(check.login);

router.get('/', staffCtrl.listStaff);
router.get('/search', staffCtrl.listStaff)
router.get('/sort-age/:age', staffCtrl.listStaff)
router.get('/sort-name/:fullname', staffCtrl.listStaff)

router.get('/add', staffCtrl.addStaff)
router.post('/add', uploadAvata.single("upload-avata"), staffCtrl.addStaff)

router.get('/off-staff/:idStaff', staffCtrl.offStaff)
router.get('/on-staff/:idStaff', staffCtrl.onStaff)



module.exports = router;