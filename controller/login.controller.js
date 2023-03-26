exports.dangNhap = (req, res, next) =>{ 
    var tieude = 'Trang Đăng Nhập'; 
    res.render('login/login', {title: tieude})
}

exports.doiPass = (req, res, next) =>{ 
    var tieude = 'Đổi mật khẩu'; 
    res.render('login/doiPass', {title: tieude})
}
