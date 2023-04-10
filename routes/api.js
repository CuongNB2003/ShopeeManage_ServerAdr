var express = require('express');
var router = express.Router();
var user_api = require('../controller/API/user.api')
var product_api = require('../controller/API/product.api')
var category_api = require('../controller/API/category.api')

router.get('/list-product', product_api.listProDuct);
router.get('/list-category', category_api.listCategory);

router.get('/dangnhap-user', user_api.dangNhap);
router.get('/dangky-user', user_api.dangKy);
router.get('/doimatkhau-user', user_api.doiMatKhau);
router.get('/doithongtin-user', user_api.doiThongTin);


module.exports = router;
