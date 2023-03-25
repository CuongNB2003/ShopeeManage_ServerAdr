exports.index = (req, res, next) =>{ 
    var tieuDe = 'Trang Home';
    res.render('home/index', {title: tieuDe})
}