const { Session } = require('express-session');
var myDB = require('../models/db.model');
const session = require('express-session');

exports.index = async (req, res, next) =>{ 
    let tieuDe = 'Trang Home';

    let soLuongTL = await myDB.theLoaiModel.find().count()
    let soLuongSP = await myDB.sanPhamModel.find().count()
    let soLuongUser = await myDB.userModel.find({role: false}).count()
    let soLuongNV = await myDB.userModel.find({role: true}).count()


    res.render('home/index', {title: tieuDe, soLuongTL: soLuongTL, soLuongSP: soLuongSP, 
        soLuongUser: soLuongUser, soLuongNV: soLuongNV })
}

exports.dangNhap = async (req, res, next) =>{ 
    let tieude = 'Trang Đăng Nhập';
    let msg = ''

    if(req.method == 'POST'){
        
        try {
            let objU = await myDB.userModel.findOne({username: req.body.username})
            if(objU != null){
                if(objU.password == req.body.password){
                    req.session.userInformation = objU
                    return res.redirect('/');
                }else{
                    msg = "sai mật khẩu "
                }
            }else{
                msg = "không tồn tại user"
            }
        } catch (error) {
            msg = error.message
        }
    }

    res.render('home/login', {title: tieude, msg: msg, })
}

exports.doiPass = async (req, res, next) =>{ 
    let tieude = 'Đổi mật khẩu'; 
    let msg = ''
    let user = req.session.userInformation
    console.log(user);
    if (req.method == "POST") {
        if(user.password != req.body.passwordCu){
            msg = "Mật khẩu cũ chưa chính xác"
        }else{
            if(req.body.passwordMoi != req.body.passwordRe){
                msg = "Xác nhận mật khẩu mới chưa chính xác"
            }else{
                try {
                    let objUser = new myDB.userModel();
                    objUser.password = req.body.passwordMoi;
                    objUser._id = user._id
                    await myDB.userModel.findByIdAndUpdate(user._id, objUser);
                    msg = "Đổi mật khẩu thành công"
                } catch (error) {
                    msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
                }
            }
        }
    }
    res.render('home/doiPass', {title: tieude, msg: msg, })
}

exports.dangXuat = async (req, res, next) =>{ 
    let tieude = 'Đăng xuất'; 
    let msg = ''
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
        msg = error.message;
    }

    res.render('home/login', {title: tieude, msg: msg, })
}