exports.listTheLoai = (req, res, next) =>{ 
    var tieuDe = 'Danh Sach The Loai';
    res.render('theloai/theloai', {title: tieuDe})
}

exports.addTheLoai = (req, res, next) =>{ 
    var tieuDe = 'Them The Loai';
    res.render('theloai/theloaiAdd', {title: tieuDe})
}