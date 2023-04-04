var myDB = require('../models/db.model')

exports.listUser = async (req, res, next) =>{ 
    let tieuDe = 'Danh Sách User';
    let msg = ''
    let listUser = await myDB.userModel.find()

    res.render('user/user', {title: tieuDe, listUser: listUser, msg: msg})
}

exports.addUser = async (req, res, next) =>{ 
    let tieuDe = 'Thêm User';
    let msg = '';
    

    if(req.method == "POST"){
        let objUser = new myDB.userModel();
        objUser.username = req.body.username;
        objUser.password = req.body.password;
        objUser.fullname = req.body.fullname;
        objUser.avata = req.body.avata;
        objUser.email = req.body.email;
        objUser.role = false;

        try {
            let new_User = await objUser.save();
            msg = "Thêm user thành công"
            res.redirect('/user/')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu"+ error.message;
        }
    }

    res.render('user/userAdd', {title: tieuDe, msg: msg, })
}

exports.editUser = async (req, res, next) =>{ 
    let tieuDe = 'Sửa User';
    let msg = '';
    let idUser = req.params.iduser;
    let objUser = await myDB.userModel.findById(idUser);

    if(req.method == "POST"){
        let objUser = new myDB.userModel();
        objUser.fullname = req.body.fullname;
        objUser.avata = req.body.avata;
        objUser.email = req.body.email;
        

        objUser._id = idUser

        try {
             await myDB.userModel.findByIdAndUpdate(idUser, objUser);
             msg = "Sửa user thành công"
             res.redirect('/user/')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu"+ error.message;
        }
    }

    res.render('user/userEdit', {title: tieuDe, msg: msg, objUser: objUser})
}

exports.deleteUser = async (req, res, next) =>{
    let tieuDe = 'Xóa User';
    let msg = '';
    let idUser = req.params.iduser;

    let objUser = new myDB.userModel();
    objUser._id = idUser;

    try {
        await myDB.userModel.findByIdAndDelete(idUser, objUser)
        msg = "Xóa user thành công"
        res.redirect('/user/')
    } catch (error) {
        msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
    }
    res.render('user/user', { title: tieuDe, msg: msg })
}

exports.blockUser = async (req, res, next) =>{ 
    let tieuDe = 'Danh Sách Chặn User';
    res.render('user/user', {title: tieuDe})
}

