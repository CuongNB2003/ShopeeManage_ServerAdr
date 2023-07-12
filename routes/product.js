var express = require('express');
var router = express.Router();
var prodCtrl = require('../controllers/product.controller');
const multer = require('multer');
var uploadProd = multer({dest : './tmp'});
var check = require('../middleware/check');
router.use(check.login);

router.get('/', prodCtrl.listProD);
router.get('/filter/:idC', prodCtrl.listProD)
router.get('/sort/:price', prodCtrl.listProD)
router.get('/search', prodCtrl.listProD)

router.get('/add', prodCtrl.addProD)
router.post('/add', uploadProd.single("upload-prod"), prodCtrl.addProD)
router.post('/',uploadProd.single("upload-prod") , prodCtrl.editProD)
router.get('/delete/:idP', prodCtrl.deleteProD)
router.get('/detail/:idP', prodCtrl.addProD)

module.exports = router;