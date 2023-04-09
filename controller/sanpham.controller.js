var myDB = require('../models/db.model')
var fs = require('fs')

exports.listSanPham = async (req, res, next) =>{ 
    let tieuDe = 'Danh Sách Sản Phẩm';
    let msg = '';
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    //tìm kiếm
    if(req.query.name != '' && String(req.query.name) != 'undefined'){
        dieuKienLoc = {name: {$regex :req.query.name}}
    }
    // chức năng lọc
    if( req.params.idtl != '0'){
        if(typeof(req.params.idtl) != 'undefined' ){
            dieuKienLoc = {id_theloai: String(req.params.idtl)}
            console.log("đã lọc: "+req.params.idtl);
        }
    }
    // chức năng sắp xếp
    if( req.params.price != '0'){
        if(typeof(req.params.price) != 'undefined' ){
            dieuKienSapXep = {price: Number(req.params.price)}
            console.log("đã sắp xếp: "+req.params.price);
        }

    }
    console.log("chưa sắp xếp: "+req.params.price);
    
    let listSP = await myDB.sanPhamModel.find(dieuKienLoc).sort(dieuKienSapXep).populate('id_theloai')
    let listTL = await myDB.theLoaiModel.find()
    res.render('sanpham/sanpham', {title: tieuDe, msg: msg, listSP: listSP, listTL: listTL, idTheLoai: req.params.idtl,  name: req.query.name, typeSort: req.params.price})
}

exports.addSanPham = async (req, res, next) =>{ 
    let tieuDe = 'Thêm Sản Phẩm';
    let msg = '';
    let url_file = ''
    let listTL = await myDB.theLoaiModel.find()

    if(req.method == "POST"){
        try {
            fs.renameSync(req.file.path, './public/upload/'+req.file.originalname);
            // dùng url file để ghi vào csdl
             url_file = '/upload/'+req.file.originalname
        } catch (error) {
            msg = error.message
        }

        let objSP = new myDB.sanPhamModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.desc = req.body.desc;
        objSP.image = url_file
        objSP.id_theloai = req.body.theloai;

        try {
            let new_SP = await objSP.save();
            msg = "Thêm sản phẩm thành công"
            res.redirect('/sanpham/')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu"+ error.message;
        }
    }

    res.render('sanpham/sanphamAdd', {title: tieuDe, msg: msg, listTL: listTL})
}

exports.editSanPham = async (req, res, next) =>{ 
    let tieuDe = 'Sửa Sản Phẩm';
    let msg = '';
    let url_file = ''
    let idSP = req.params.idsp;
    let listTL = await myDB.theLoaiModel.find()
    let objSP = await myDB.sanPhamModel.findById(idSP);

    if(req.method == "POST"){
        try {
            fs.renameSync(req.file.path, './public/upload/'+req.file.originalname);
            // dùng url file để ghi vào csdl
             url_file = '/upload/'+req.file.originalname
        } catch (error) {
            msg = error.message
        }

        let objSP = new myDB.sanPhamModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.desc = req.body.desc;
        objSP.image = url_file
        objSP.id_theloai = req.body.theloai;

        objSP._id = idSP;

        try {
            await myDB.sanPhamModel.findByIdAndUpdate(idSP, objSP);
            msg = "Sửa sản phẩm thành công"
            res.redirect('/sanpham/')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu"+ error.message;
        }
    }

    res.render('sanpham/sanphamEdit', {title: tieuDe, msg: msg, listTL: listTL, objSP: objSP})
}

exports.deleteSanPham = async (req, res, next) =>{
    let tieuDe = 'Xóa Thể Loại';
    let msg = '';
    let idSP = req.params.idsp;

    let objSP = new myDB.sanPhamModel();
    objSP._id = idSP;

    try {
        await myDB.sanPhamModel.findByIdAndDelete(idSP, objSP)
        msg = "Xóa thể loại thành công"
        res.redirect('/sanpham/')
    } catch (error) {
        msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
    }
    res.render('sanpham/sanpham', { title: tieuDe, msg: msg })
}

exports.chitietSanPham = async (req, res, next) =>{
    let tieuDe = 'Chi tiết sản phẩm';
    let msg = '';
    let idSP = req.params.idsp;
    let objSP = await myDB.sanPhamModel.findById(idSP);

    res.render('sanpham/sanphamChiTiet', {title: tieuDe, objSP: objSP, msg: msg})
}