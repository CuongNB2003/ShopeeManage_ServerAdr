var myDB = require('../models/db.model')

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
            console.log(objU.role);
            if(objU.role == false){
                msg = "Rất tiếc bạn không phải là quản trị viên"
            }else{
                if(objU != null){
                    // kiểm tra mật khẩu
                    if(objU.password == req.body.password){
                        // đăng nhập thành công
                        // ghi dữ liệu vào sessio 
                        req.session.userInformation = objU
                        // chuyển trang
                        return res.redirect('/');
                    }else{
                        msg = "Sai mật khẩu "
                    }
                }else{
                    msg = "Tài khoản không tồn tại"
                }
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

    res.render('home/doiPass', {title: tieude, msg: msg, })
}