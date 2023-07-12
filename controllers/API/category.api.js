var myDB = require('../../models/product.model')

exports.list = async (req, res, next) => {
    try {
        //api phân trang http://localhost:3000/category?limit=&page=
        if (req.query.limit && req.query.page) {
            let skip = (req.query.page - 1) * req.query.limit;
            let total = await myDB.categoryModel.countDocuments();
            let data = await myDB.categoryModel.find().skip(skip).limit(req.query.limit);
            let totalPage = Math.ceil(total / req.query.limit);
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
        // load toàn bộ
        let list = await myDB.categoryModel.find()
        return res.status(200).json({
                msg: " Successful Data Category",
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
            let obj = new myDB.categoryModel()
            obj.name = req.body.name

            let new_cate = await obj.save()
            return res.status(201).json({
                msg: " Successful Add Category",
                data: new_cate
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

            let obj = await myDB.categoryModel.findById(req.params.id)
            obj.name = req.body.name;

            await myDB.categoryModel.findByIdAndUpdate(req.params.id, obj)
            return res.status(200).json({
                msg: " Successful Edit Category",
                data: obj,
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
        await myDB.categoryModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            msg: " Successful Delete Category",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }
}