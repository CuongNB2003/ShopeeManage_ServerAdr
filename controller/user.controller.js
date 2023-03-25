exports.listUser = (req, res, next) =>{ 
    var tieuDe = 'Danh Sach User';
    res.render('user/user', {title: tieuDe})
}