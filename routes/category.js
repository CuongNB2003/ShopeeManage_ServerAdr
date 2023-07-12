var express = require('express');
var router = express.Router();
var catCtrl = require('../controllers/category.controller');
var check = require('../middleware/check');
router.use(check.login);

router.get('/', catCtrl.listCat);
router.post('/', catCtrl.editCat);
router.get('/search', catCtrl.listCat)

router.get('/add', catCtrl.addCat)
router.post('/add', catCtrl.addCat)

router.get('/delete/:idCat', catCtrl.deleteCat)




module.exports = router;