var myDB = require('../models/db.model')
var fs = require('fs')

exports.listUser = async (req, res, next) =>{ 
    let tieuDe = 'Danh Sách User';
    let msg = ''
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    // chức năng tìm kiếm
    if(req.query.username != '' && String(req.query.username) != 'undefined'){
        dieuKienLoc = {username: {$regex: req.query.username}}
    }
    // chức năng lọc
    if( req.params.role != '0'){
        if(typeof(req.params.role) != 'undefined' ){
            dieuKienLoc = {role: req.params.role}
            console.log("đã lọc: "+req.params.idtl);
        }
    }
    // chức năng sắp xếp
    if( req.params.fullname != '0'){
        if(typeof(req.params.fullname) != 'undefined' ){
            dieuKienSapXep = {fullname: Number(req.params.fullname)}
            console.log("đã sắp xếp: "+req.params.fullname);
        }
    }

    let listUser = await myDB.userModel.find(dieuKienLoc).sort(dieuKienSapXep)

    res.render('user/user', {title: tieuDe, listUser: listUser, msg: msg, luuRole: req.params.role, username: req.query.username,
        typeFilter: req.params.role, typeSort: req.params.fullname})
}

exports.addUser = async (req, res, next) =>{ 
    let tieuDe = 'Thêm User';
    let msg = '';
    let url_file =''
    if(req.method == "POST"){
        try {
            fs.renameSync(req.file.path, './public/avata/'+req.file.originalname);
            // dùng url file để ghi vào csdl
             url_file = '/avata/'+req.file.originalname

            msg = 'Địa chỉ hình ảnh: '+url_file;
            console.log(url_file);
        } catch (error) {
            msg = error.message
        }
        let objUser = new myDB.userModel();
        objUser.username = req.body.username;
        objUser.password = req.body.password;
        objUser.fullname = req.body.fullname;
        objUser.avata = url_file;
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
    let url_file =''
    if(req.method == "POST"){
        try {
            fs.renameSync(req.file.path, './public/avata/'+req.file.originalname);
            // dùng url file để ghi vào csdl
            url_file = '/avata/'+req.file.originalname
        } catch (error) {
            msg = error.message
        }

        let objUser = new myDB.userModel();
        objUser.fullname = req.body.fullname;
        objUser.avata = url_file
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

