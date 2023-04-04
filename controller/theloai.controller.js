var myDB = require('../models/db.model')

exports.listTheLoai = async (req, res, next) =>{ 
    let tieuDe = 'Danh Sách Thể Loại';
    let msg = '';
    let listTL = await myDB.theLoaiModel.find();


    res.render('theloai/theloai', {title: tieuDe, listTL: listTL, msg: msg})
}

exports.addTheLoai = async (req, res, next) =>{ 
    let tieuDe = 'Thêm Thể Loại';
    let msg = '';

    if(req.method == "POST"){
        let objTL = new myDB.theLoaiModel();
        objTL.name = req.body.name;

        try {
            let new_TL = await objTL.save();
            msg = "Thêm sản phẩm thành công"
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu"+ error.message;
        }
    }

    res.render('theloai/theloaiAdd', {title: tieuDe, msg: msg, })
}

exports.editTheLoai = async (req, res, next) =>{ 
    let tieuDe = 'Sửa Thể Loại';
    let msg = '';
    let idTL = req.params.idtl;
    let objTL = await myDB.theLoaiModel.findById(idTL);

    if(req.method == "POST"){
        let objTL = new myDB.theLoaiModel();
        objTL.name = req.body.name;

        objTL._id = idTL;

        try {
            await myDB.theLoaiModel.findByIdAndUpdate(idTL, objTL)
            msg = "Thêm sản phẩm thành công"
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu"+ error.message;
        }
    }
    res.render('theloai/theloaiEdit', {title: tieuDe, objTL: objTL, msg: msg})
}