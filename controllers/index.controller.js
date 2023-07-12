var myDBProduct = require('../models/product.model');
var myDBUser = require('../models/user.model');

exports.index = async (req , res , next) =>{
    var title = "TRANG CHỦ";
    roleU = await myDBUser.roleModel.findOne({name: 'user'})
    roleS = await myDBUser.roleModel.findOne({name: 'staff'})

    let soLuongCate = await myDBProduct.categoryModel.find().count()
    let soLuongProd = await myDBProduct.productModel.find().count()
    let soLuongUser = await myDBUser.userModel.find({id_role: roleU._id}).count()
    let soLuongStaff = await myDBUser.userModel.find({id_role: roleS._id}).count()

    res.render('index', {   
        title: title,
        category: soLuongCate,
        product: soLuongProd,
        user: soLuongUser,
        staff: soLuongStaff,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}

exports.login = async (req , res , next) => {
    let title = "Login"
    let msg = "";
    let typeErr = false;

    if(req.method == 'POST'){
        let Username = req.body.username;
        let Password = req.body.password;
        
        let objUser = await myDBUser.userModel.findOne({username : Username});

        if(objUser){
            if(objUser.role != "user"){
                if(objUser.acc_status){
                    if(objUser.password == Password){
                        console.log("User " + objUser.username);
                        req.session.userLogin = objUser;
                        res.redirect('/');
                        console.log("============="+objUser);
                    }else{
                        msg = "Mật khẩu không chính xác.";
                        typeErr = true;
                    }
                }else{
                    msg = "Tài khoản của bạn đã mất quyền truy cập.";
                    typeErr = true;
                }
            }else{
                msg = "Tài khoản khách không thể đăng nhập vào trang quản trị.";
                typeErr =  true;
            }

        }else{
            msg = "Tài khoản không tồn tại.";
            typeErr =  true;
        }
    }

    res.render('account/login',{
            msg : msg, title: title,
            typeErr : typeErr
        }
    )
}

exports.changePass = (req , res ,next) => {
    let title = "ĐỔI MẬT KHẨU";
    let msg = "";
    

    res.render('account/changePass', {   
        title: title,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}

exports.changeInfo = (req , res ,next) => {
    let title = "ĐỔI THÔNG TIN CÁ NHÂN";
    let msg = "";
    

    res.render('account/changeInfo', {   
        title: title,
        sUser : req.session.userLogin.fullname,
        sAvata : req.session.userLogin.avata,
    })
}

exports.logout = (req , res , next) => {
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
        console.log("Lỗi ở đây nè: ===== "+error.message);
    }
    res.redirect('account/login');
}