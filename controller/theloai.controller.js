var myDB = require('../models/db.model')

exports.listTheLoai = async (req, res, next) => {
    let tieuDe = 'Danh Sách Thể Loại';
    let msg = '';
    let dieuKiemLoc = null;
    let listTL = await myDB.theLoaiModel.find(dieuKiemLoc);


    res.render('theloai/theloai', { title: tieuDe, listTL: listTL, msg: msg })
}

exports.addTheLoai = async (req, res, next) => {
    let tieuDe = 'Thêm Thể Loại';
    let msg = '';

    if (req.method == "POST") {
        let objTL = new myDB.theLoaiModel();
        objTL.name = req.body.name;

        try {
            let new_TL = await objTL.save();
            msg = "Thêm thể loại thành công"
            res.redirect('/category/')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
        }
    }

    res.render('theloai/theloaiAdd', { title: tieuDe, msg: msg, })
}

exports.editTheLoai = async (req, res, next) => {
    let tieuDe = 'Sửa Thể Loại';
    let msg = '';
    let idTL = req.params.idtl;
    let objTL = await myDB.theLoaiModel.findById(idTL);
    console.log('sửa'+idTL);

    if (req.method == "POST") {
        let objTL = new myDB.theLoaiModel();
        objTL.name = req.body.name;

        objTL._id = idTL;

        try {
            await myDB.theLoaiModel.findByIdAndUpdate(idTL, objTL)
            msg = "Sửa thể loại thành công"
            res.redirect('/category/')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
        }
    }
    res.render('theloai/theloaiEdit', { title: tieuDe, objTL: objTL, msg: msg })
}

exports.deleteTheLoai = async (req, res, next) => {
    let tieuDe = 'Xóa Thể Loại';
    let msg = '';
    let id = req.params.idtl
    let objTL = new myDB.theLoaiModel();
    objTL._id = id

    console.log('id truyền vào '+id);
    console.log('id lay đc     '+objTL._id)

    try {
        await myDB.theLoaiModel.findByIdAndDelete(req.params.idtl, req.body)
        msg = "Xóa thể loại thành công"
        res.redirect('/category/')
    } catch (error) {
        msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
    }
    res.render('theloai/theloai', { title: tieuDe, msg: msg})
}