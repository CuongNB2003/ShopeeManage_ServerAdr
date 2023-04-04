var myDB = require('../models/db.model')

exports.listUser = async (req, res, next) =>{ 
    let tieuDe = 'Danh Sách User';
    let msg = ''
    let listUser = await myDB.userModel.find()

    res.render('user/user', {title: tieuDe, listUser: listUser, msg: msg})
}

exports.blockUser = async (req, res, next) =>{ 
    let tieuDe = 'Danh Sách Chặn User';
    res.render('user/user', {title: tieuDe})
}

exports.dangNhap = async (req, res, next) =>{ 
    let tieude = 'Trang Đăng Nhập'; 
    res.render('user/login', {title: tieude})
}

exports.doiPass = async (req, res, next) =>{ 
    let tieude = 'Đổi mật khẩu'; 
    res.render('user/doiPass', {title: tieude})
}
