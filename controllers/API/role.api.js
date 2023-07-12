var myDB = require('../../models/user.model')

exports.list = async (req, res, next) => {
    try {

        if (req.query.limit && req.query.page) {
            //api phân trang http://localhost:3000/role?limit=&page=
            let skip = (req.query.page - 1) * req.query.limit;//số trang bỏ qua

            let total = await myDB.roleModel.countDocuments();//tổng số bản ghi
            let data = await myDB.roleModel.find().skip(skip).limit(req.query.limit);//data lấy được

            let totalPage = Math.ceil(total / req.query.limit);//tổng số trang
            if (req.query.page > totalPage) {
                return res.status(203).json({
                    msg: "Fail",
                })
            }

            return res.status(200).json({
                data: [...data],
                msg: "Successful Data Paging",
            })
        }
        //load toàn bộ
        let list = await myDB.roleModel.find()
        return res.status(200).json({
            msg: "Successful Data Role",
            data: list
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
        if (req.method == "POST") {
            let obj = new myDB.roleModel()
            obj.name = req.body.name
            obj.status = req.body.status
            
            let new_role = await obj.save()
            return res.status(201).json({
                msg: "Successful Add Role",
                data: new_role
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
    try {
        if (req.method == "PUT") {

            let obj = await myDB.roleModel.findById(req.params.id)
            obj.name = req.body.name;
            obj.status = req.body.status;

            await myDB.roleModel.findByIdAndUpdate(req.params.id, obj)
            return res.status(200).json({
                msg: "Successful Edit Role",
                data: obj
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }
}

exports.delete = async (req, res, next) => {
    try {

        await myDB.roleModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            msg: " Successful Delete Role"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }
}