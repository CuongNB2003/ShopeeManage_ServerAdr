const { title } = require('process');
var myDB = require('../models/user.model');
var fs = require('fs')

exports.listStaff = async (req, res, next) => {
    var title = "DANH SÁCH NHÂN VIÊN";
    let msg = '';
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    let role = await myDB.roleModel.findOne({name:'staff'})
    //tìm kiếm
    if (req.query.fullname != '' && String(req.query.fullname) != 'undefined') {
        dieuKienLoc = { id_role: role._id, fullname: { $regex: req.query.fullname } }
    }else{
        dieuKienLoc = {id_role: role._id}
    }
    // sắp xếp
    if (req.params.fullname != '0') {
        if (typeof (req.params.fullname) != 'undefined') {
            dieuKienSapXep = { fullname: Number(req.params.fullname) }
        }
    }
    if (req.params.age != '0') {
        if (typeof (req.params.age) != 'undefined') {
            dieuKienSapXep = { age: Number(req.params.age) }
        }
    }

    let listStaff = await myDB.userModel.find(dieuKienLoc).skip(req.query.Index).limit(5).sort(dieuKienSapXep).populate('id_role')
    let count = await myDB.userModel.find({id_role: role._id}).count();

    res.render('staff/listS', {
        title: title, msg: msg,
        listStaff: listStaff,
        name: req.query.name,
        sortNameS: req.params.fullname,
        sortAge: req.params.age,
        count : count,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}

exports.addStaff = async (req, res, next) => {
    let title = "THÊM NHÂN VIÊN"
    let msg = ''
    let role = await myDB.roleModel.findOne({name:'staff'})
    if (req.method == "POST") {
        let obj = new myDB.userModel()
        obj.username = req.body.username
        obj.password = req.body.password
        obj.fullname = req.body.fullname
        obj.age = req.body.age
        obj.email = req.body.email
        obj.phone = req.body.phone
        obj.address = req.body.address
        obj.acc_status = true
        obj.id_role = role._id
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/avata_upload/'+ req.file.originalname )
                obj.avata = '/avata_upload/' + req.file.originalname
            }
        } catch (error) {
            console.log("================= Ảnh lỗi rồi m ơi: "+error.message);
        }

        try {
            await obj.save()
            res.redirect('/staff')

        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu " +error.message
        }
    }
    res.render('staff/addS',{
        title: title, msg: msg,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}

exports.offStaff = async (req, res, next) => {
    let id = req.params.idStaff
    let obj = await myDB.userModel.findById(id)
    obj.acc_status = false;
    try {
        await myDB.userModel.findByIdAndUpdate(id, obj)
        res.redirect('/staff')
    } catch (error) {
        console.log(error);
    }

    res.render('staff/listS')
}

exports.onStaff = async (req, res, next) =>{
    let id = req.params.idStaff
    let obj = await myDB.userModel.findById(id)
    obj.acc_status = true;
    try {
        await myDB.userModel.findByIdAndUpdate(id, obj)
        res.redirect('/staff')
    } catch (error) {
        console.log(error);
    }
    
    res.render('staff/listS')
}