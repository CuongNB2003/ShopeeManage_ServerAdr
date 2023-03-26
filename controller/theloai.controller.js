exports.listTheLoai = (req, res, next) =>{ 
    var tieuDe = 'Danh Sách Thể Loại';
    res.render('theloai/theloai', {title: tieuDe})
}

exports.addTheLoai = (req, res, next) =>{ 
    var tieuDe = 'Thêm Thể Loại';
    res.render('theloai/theloaiAdd', {title: tieuDe})
}

exports.editTheLoai = (req, res, next) =>{ 
    var tieuDe = 'Sửa Thể Loại';
    res.render('theloai/theloaiEdit', {title: tieuDe})
}