exports.dangNhap = (req, res, next) =>{ 
    var tieude = 'Trang Đăng Nhập'; 
    res.render('login/login', {title: tieude})
}
