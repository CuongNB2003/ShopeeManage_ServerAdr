var myDB = require('../../models/user.model')
var fs = require('fs')
const bcrypt = require('bcrypt');

exports.list = async (req, res, next) => {
    try {
        //lọc theo username
        if (req.query.username) {
            let data = await myDB.userModel.findOne({ username: req.query.username }).populate("id_role");
            return res.status(200).json({
                msg: "Successful Data Username",
                data: data,
            })
        }
        //lọc theo email
        if (req.query.email) {
            let list = await myDB.userModel.find({ email: { $regex: req.query.email } }).populate("id_role");
            return res.status(200).json({
                msg: "Successful Data Email",
                data: list,
            })
        }
        //lọc theo vai trò
        if (req.query.id_role) {
            let list = await myDB.userModel.find({ id_role: req.query.id_role }).populate("id_role");
            return res.status(200).json({
                msg: "Successful Data Id_role",
                data: list,
            })
        }
        //api phân trang http://localhost:3000/user?limit=&page=
        if (req.query.limit && req.query.page) {
            let skip = (req.query.page - 1) * req.query.limit;
            let total = await myDB.userModel.countDocuments();
            let data = await myDB.userModel.find().skip(skip).limit(req.query.limit).populate("id_role");
            let totalPage = Math.ceil(total / req.query.limit);
            if (req.query.page > totalPage) {
                return res.status(203).json({
                    msg: "Fail",
                })
            }

            return res.status(200).json({
                msg: "Successful Data Paging",
                data: data,
            })
        }
        // load toàn bộ
        let list = await myDB.userModel.find().populate("id_role");
        let sum = await myDB.userModel.find().count()
        return res.status(200).json({
            msg: " Successful Data User",
            sum: sum,
            data: list,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }

}

exports.add = async (req, res, next) => {
    try {
        let role = await myDB.roleModel.findOne({ name: 'user' })
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
                if (req.file) {
                    fs.renameSync(req.file.path, './public/avata_upload/' + req.file.originalname)
                    obj.avata = '/avata_upload/' + req.file.originalname
                }
            } catch (error) {
                console.log("================= Ảnh lỗi rồi m ơi: " + error.message);
            }

            let new_user = await obj.save()
            return res.status(201).json({
                msg: " Successful Add User",
                data: new_user
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }
}

exports.edit = async (req, res, next) => {
    if (req.method == "PUT") {

        let obj = await myDB.userModel.findById(req.params.id)
        obj.fullname = req.body.fullname
        obj.age = req.body.age
        obj.email = req.body.email
        obj.phone = req.body.phone
        obj.address = req.body.address
        try {
            if (req.file) {
                fs.renameSync(req.file.path, './public/avata_upload/' + req.file.originalname)
                obj.avata = '/avata_upload/' + req.file.originalname
            }
        } catch (error) {
            console.log("================= Ảnh lỗi rồi m ơi: " + error.message);
        }
        try {
            await myDB.userModel.findByIdAndUpdate(req.params.id, obj)
            return res.status(200).json({
                msg: " Successful Edit User",
                data: obj
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Internal Server Error",

            })
        }

    }
}

exports.delete = async (req, res, next) => {
    try {
        await myDB.userModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            msg: " Successful Delete User"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }
}

exports.login = async (req, res, next) => {
    try {
        let checkLogin = false;
        let inforUser = await myDB.userModel.findOne({ username: req.query.username });
        if(inforUser){
            if(inforUser.password == req.query.password){
                checkLogin = true
                return res.status(200).json({
                    inforUser: inforUser,
                    msg: "Đăng nhập thành công",
                    checkLogin: checkLogin
                })
            }else{
                return res.status(203).json({
                    msg: "Sai mật khẩu",
                    checkLogin: checkLogin
                })
            }
        }
        return res.status(203).json({
            msg: "Tài khoản không tồn tại",
            checkLogin: checkLogin
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }
}