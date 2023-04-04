var myDB = require('../models/db.model')

exports.listSanPham = async (req, res, next) =>{ 
    let tieuDe = 'Danh Sách Sản Phẩm';
    let msg = '';
    let dieuKienLoc = null;
    let theloai = req.body.theloai;
    if( typeof(req.query.theloai) != 'undefined'){
        // dieuKienLoc = { price: req.query.price }
        // dieuKienLoc = { price: {$gte: req.query.price} }
        dieuKienLoc = {id_theloai: req.query.theloai}
    }

    
    console.log("dk loc "+ dieuKienLoc);
    let listTL = await myDB.theLoaiModel.find()
    let listSP = await myDB.sanPhamModel.find(dieuKienLoc).populate('id_theloai')
    
    res.render('sanpham/sanpham', {title: tieuDe, msg: msg, listSP: listSP, listTL: listTL})
}

exports.addSanPham = async (req, res, next) =>{ 
    let tieuDe = 'Thêm Sản Phẩm';
    let msg = '';
    let listTL = await myDB.theLoaiModel.find()

    if(req.method == "POST"){
        let objSP = new myDB.sanPhamModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.desc = req.body.desc;
        objSP.image = req.body.image;
        objSP.id_theloai = req.body.theloai;
        console.log(req.body.theloai);

        try {
            let new_SP = await objSP.save();
            msg = "Thêm sản phẩm thành công"
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu"+ error.message;
        }
    }

    res.render('sanpham/sanphamAdd', {title: tieuDe, msg: msg, listTL: listTL})
}

exports.editSanPham = async (req, res, next) =>{ 
    let tieuDe = 'Sửa Sản Phẩm';
    let msg = '';
    let idSP = req.params.idsp;
    let listTL = await myDB.theLoaiModel.find()
    let objSP = await myDB.sanPhamModel.findById(idSP);

    if(req.method == "POST"){
        let objSP = new myDB.sanPhamModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.desc = req.body.desc;
        objSP.image = req.body.image;
        objSP.id_theloai = req.body.theloai;

        objSP._id = idSP;

        try {
            await myDB.sanPhamModel.findByIdAndUpdate(idSP, objSP);
            msg = "Sửa sản phẩm thành công"
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu"+ error.message;
        }
    }

    res.render('sanpham/sanphamEdit', {title: tieuDe, msg: msg, listTL: listTL, objSP: objSP})
}

exports.chitietSanPham = async (req, res, next) =>{
    let tieuDe = 'Chi tiết sản phẩm';
    let msg = '';
    let idSP = req.params.idsp;
    let objSP = await myDB.sanPhamModel.findById(idSP);

    res.render('sanpham/sanphamChiTiet', {title: tieuDe, objSP: objSP, msg: msg})
}