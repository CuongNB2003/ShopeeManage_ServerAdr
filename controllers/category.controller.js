var myDB = require('../models/product.model')

exports.listCat = async (req, res, next) => {
    var title = "DANH SÁCH THỂ LOẠI";
    let msg = '';
    let dieuKienLoc = null;
    //tìm kiếm
    if (req.query.name != '' && String(req.query.name) != 'undefined') {
        dieuKienLoc = { name: { $regex: req.query.name } }
    }

    let list = await myDB.categoryModel.find(dieuKienLoc).skip(req.query.Index).limit(5)
    let count = await myDB.categoryModel.countDocuments();

    res.render('category/listC', {
        title: title,
        listCate: list,
        msg: msg,
        count: count,
        name: req.query.name,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}

exports.addCat = async (req, res, next) => {
    var title = "Thêm Thể Loại";
    let msg = ''

    if (req.method == "POST") {
        let obj = new myDB.categoryModel();
        obj.name = req.body.name
        try {
            await obj.save()
            res.redirect('/category')
        } catch (err) {
            msg = 'Lỗi ghi cơ sở dữ liệu' + err.message
        }
    }

    res.render('category/addC', {
        title: title, msg: msg,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}

exports.editCat = async (req, res, next) => {
    if (req.method == "POST") {
        let idC = req.body.idCat

        let obj = await myDB.categoryModel.findById(idC)
        obj.name = req.body.name;

        try {
            await myDB.categoryModel.findByIdAndUpdate(idC, obj)
            res.redirect('/category')
        } catch (error) {
            console.log("Lỗi ở đây: " + error.message);
        }

    }

    res.render('category/listC', {})
}

exports.deleteCat = async (req, res, next) => {
    let id = req.params.idCat

    try {
        await myDB.categoryModel.findByIdAndDelete(id)
        res.redirect('/category')
    } catch (error) {
        console.log('Lỗi ở đây: ' + error.message);
    }
    res.render('category/listC', {})
}