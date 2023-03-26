exports.listUser = (req, res, next) =>{ 
    var tieuDe = 'Danh Sách User';
    res.render('user/user', {title: tieuDe})
}

exports.blockUser = (req, res, next) =>{ 
    var tieuDe = 'Danh Sách Chặn User';
    res.render('user/user', {title: tieuDe})
}

exports.dangNhap = (req, res, next) =>{ 
    var tieude = 'Trang Đăng Nhập'; 
    res.render('user/login', {title: tieude})
}

exports.doiPass = (req, res, next) =>{ 
    var tieude = 'Đổi mật khẩu'; 
    res.render('user/doiPass', {title: tieude})
}
