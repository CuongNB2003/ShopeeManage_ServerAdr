var express = require('express')
var router = express.Router()
var roleApi = require('../controllers/API/role.api')
var userApi = require('../controllers/API/user.api')
var cateApi = require('../controllers/API/category.api')
var prodApi = require('../controllers/API/product.api')

const multer = require('multer')
var uploadAvata = multer({dest : './tmp'})
var uploadProd = multer({dest : './tmp'})


//login
router.post('/login', userApi.login)

//user 
router.get('/user', userApi.list)
router.post('/user/add', uploadAvata.single("upload-avata"), userApi.add)
router.put('/user/edit/:id', uploadAvata.single("upload-avata"), userApi.edit)
router.delete('/user/delete/:id', userApi.delete)

//product 
router.get('/product', prodApi.list)
router.post('/product/add', uploadProd.single("upload-prod"), prodApi.add)
router.put('/product/edit/:id', uploadProd.single("upload-prod"), prodApi.edit)
router.delete('/product/delete/:id', prodApi.delete)

//category tốt
router.get('/category', cateApi.list)
router.post('/category/add', cateApi.add)
router.put('/category/edit/:id', cateApi.edit)
router.delete('/category/delete/:id', cateApi.delete)

//role tốt
router.get('/role', roleApi.list)
router.post('/role/add', roleApi.add)
router.put('/role/edit/:id', roleApi.edit)
router.delete('/role/delete/:id', roleApi.delete)

module.exports = router;

