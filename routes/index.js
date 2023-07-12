var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index.controller')
var check = require('../middleware/check');



router.get('/', check.login, indexCtrl.index);

router.get('/login', indexCtrl.login);
router.post('/login', indexCtrl.login);

router.get('/change-pass', check.login, indexCtrl.changePass);
router.post('/change-pass', check.login, indexCtrl.changePass);

router.get('/change-info', check.login, indexCtrl.changeInfo);
router.post('/change-info', check.login, indexCtrl.changeInfo);

router.get('/log-out', check.login, indexCtrl.logout);


module.exports = router;
