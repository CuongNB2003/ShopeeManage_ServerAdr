var myDB = require('../models/db.model')

exports.index = async (req, res, next) =>{ 
    let tieuDe = 'Trang Home';
    let ktraSoLuongNV = {role: true};
    let soLuongTL = await myDB.theLoaiModel.find().count()
    let soLuongSP = await myDB.sanPhamModel.find().count()
    let soLuongUser = await myDB.userModel.find({role: false}).count()
    let soLuongNV = await myDB.userModel.find(ktraSoLuongNV).count()


    res.render('home/index', {title: tieuDe, soLuongTL: soLuongTL, soLuongSP: soLuongSP, 
        soLuongUser: soLuongUser, soLuongNV: soLuongNV })
}

exports.dangNhap = async (req, res, next) =>{ 
    let tieude = 'Trang Đăng Nhập'; 
    res.render('home/login', {title: tieude})
}

exports.doiPass = async (req, res, next) =>{ 
    let tieude = 'Đổi mật khẩu'; 
    res.render('home/doiPass', {title: tieude})
}