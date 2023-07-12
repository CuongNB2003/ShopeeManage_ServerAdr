var myDB = require('../models/product.model');
var fs = require('fs')

exports.listProD = async (req, res, next) => {
    var title = "DANH SÁCH SẢN PHẨM";
    let msg = '';
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    //tìm kiếm
    if (req.query.name != '' && String(req.query.name) != 'undefined') {
        dieuKienLoc = { name: { $regex: req.query.name } }
    }
    // lọc
    if (req.params.idC != '0') {
        if (typeof (req.params.idC) != 'undefined') {
            dieuKienLoc = { id_category: String(req.params.idC) }
            console.log("đã lọc: " + req.params.idC);
        }
    }
    // sắp xếp
    if (req.params.price != '0') {
        if (typeof (req.params.price) != 'undefined') {
            dieuKienSapXep = { price: Number(req.params.price) }
            console.log("đã sắp xếp: " + req.params.price);
        }
    }

    let listProd = await myDB.productModel.find(dieuKienLoc).skip(req.query.Index).limit(5).sort(dieuKienSapXep).populate('id_category')
    let listCate = await myDB.categoryModel.find();
    let count = await myDB.productModel.countDocuments();

    res.render('product/listP', {
        title: title, msg: msg,
        listProd: listProd,
        listCate: listCate,
        idTheLoai: req.params.idC,
        name: req.query.name,
        typeSort: req.params.price,
        count : count,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}

exports.addProD = async (req, res, next) => {
    var title = "Thêm sản phẩm";
    let msg = '';
    let listTL = await myDB.categoryModel.find();
    if(req.method == "POST"){
        let obj = new myDB.productModel()
        obj.name = req.body.name
        obj.price = req.body.price
        obj.id_category = req.body.category
        obj.quantity = req.body.quantity
        obj.detail = req.body.detail
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/ImgProduct/'+ req.file.originalname)
                obj.image = '/ImgProduct/' + req.file.originalname
            }
        } catch (error) {
            console.log("Lỗi đọc file " + error);
        }

        try {
            await obj.save();
            res.redirect('/product')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu " +error.message
        }
    }


    res.render('product/addP', {
        title: title, msg: msg,
        listTL: listTL,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
        
    })
}

exports.editProD = async (req, res, next) => {
    if(req.method == "POST") {
        let id = req.body.idProduct
        let obj = await myDB.productModel.findById(id);

        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/ImgProduct/' + req.file.originalname)
                obj.image = '/ImgProduct/' + req.file.originalname
            }
        } catch (error) {
            console.log("Lỗi đọc file " + error);
        }
        obj.name = req.body.name
        obj.price = req.body.price
        obj.id_category = req.body.category
        obj.quantity = req.body.quantity
        obj.description = req.body.description
        try {
            await myDB.productModel.findByIdAndUpdate(id, obj)
            res.redirect('/product')
        } catch (error) {
            console.log("Lỗi ghi dữ liệu"+error)
        }
    }
    res.render('product/listP')
}

exports.deleteProD = async (req, res, next) => {
    let id = req.params.idP;
    try {
        await myDB.productModel.findByIdAndDelete(id);
        res.redirect('/product')
    } catch (error) {
        console.log("Lỗi khi xóa: "+error);
    }
    res.render('product/listP')
}

exports.detailProD = async (req, res, next) => {
    var title = "Danh Sách Thể Loại";
    let msg = '';

    res.render('product/detailP', {
        title: title, msg: msg,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}