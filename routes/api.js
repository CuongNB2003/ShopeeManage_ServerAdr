var express = require('express');
var router = express.Router();
var user_api = require('../controller/API/user.api')
var product_api = require('../controller/API/product.api')
var category_api = require('../controller/API/category.api')

router.get('/list-product', product_api.listProDuct);
router.get('/list-category', category_api.listCategory);
// router.get('/list-product/:id', product_api.timKiemSP);

router.post('/login', user_api.dangNhap);
router.post('/reg', user_api.dangKy);
router.put('/doimatkhau', user_api.doiMatKhau);
router.put('/doithongtin', user_api.doiThongTin);
router.get('/dangxuat', user_api.dangXuat);


module.exports = router;
