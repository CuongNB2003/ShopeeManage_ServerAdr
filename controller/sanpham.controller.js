exports.listSanPham = (req, res, next) =>{ 
    var tieuDe = 'Danh Sach San Pham';
    res.render('sanpham/sanpham', {title: tieuDe})
}

exports.addSanPham = (req, res, next) =>{ 
    var tieuDe = 'Them San Pham';
    res.render('sanpham/sanphamAdd', {title: tieuDe})
}