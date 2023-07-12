const { log } = require('console');
var myDB = require('../models/user.model');
var fs = require('fs')

exports.listUser = async (req, res, next) => {
    var title = "DANH SÁCH KHÁCH HÀNG";
    let msg = '';
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    let role = await myDB.roleModel.findOne({name:'user'})
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
            console.log("đã sắp xếp: " + req.params.fullname);
        }
    }
    if (req.params.age != '0') {
        if (typeof (req.params.age) != 'undefined') {
            dieuKienSapXep = { age: Number(req.params.age) }
            console.log("đã sắp xếp: " + req.params.age);
        }
    }

    let listUser = await myDB.userModel.find(dieuKienLoc).skip(req.query.Index).limit(5).sort(dieuKienSapXep).populate('id_role')
    let count = await myDB.userModel.find({id_role: role._id}).count();

    res.render('user/listU', {
        title: title, msg: msg,
        listUser: listUser,
        name: req.query.name,
        sortName: req.params.fullname,
        sortAge: req.params.age,
        count : count,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}

exports.blockUser = async (req, res, next) =>{
    let id = req.params.idUser
    let obj = await myDB.userModel.findById(id)
    obj.acc_status = false;
    try {
        await myDB.userModel.findByIdAndUpdate(id, obj)
        res.redirect('/user')
    } catch (error) {
        console.log(error);
    }

    res.render('user/listU')
}

exports.unBlockUser = async (req, res, next) =>{
    let id = req.params.idUser
    let obj = await myDB.userModel.findById(id)
    obj.acc_status = true;
    try {
        await myDB.userModel.findByIdAndUpdate(id, obj)
        res.redirect('/user')
    } catch (error) {
        console.log(error);
    }

    res.render('user/listU')
}

