exports.dieuHuongDangNhap = (req, res, next )=>{
    if(req.session.userInformation){
        // có tồn tại session
        next();
    }else{
        // không tồn tại thông tin đăng nhập
        // chuyển sang trang đăng nhập
        res.redirect('/login')
    }
}