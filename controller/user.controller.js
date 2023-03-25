exports.listUser = (req, res, next) =>{ 
    var tieuDe = 'Danh Sách User';
    res.render('user/user', {title: tieuDe})
}