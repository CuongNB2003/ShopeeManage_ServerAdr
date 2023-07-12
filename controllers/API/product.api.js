var myDB = require('../../models/product.model')
var fs = require('fs')

exports.list = async (req, res, next) => {
    try {
        //lọc theo name
        if (req.query.name) {
            let data = await myDB.productModel.find({ name: { $regex: req.query.name } }).populate('id_category')
            return res.status(200).json({
                msg: "Lọc theo name thành công",
                data: data,
            })
        }
        //lọc theo price
        if (req.query.price) {
            let data = await myDB.productModel.find({ price: req.query.price }).populate('id_category')
            return res.status(200).json({
                msg: "Lọc theo price thành công",
                data: data,
            })
        }
        //lọc theo id_cate
        if (req.query.id_category) {
            let data = await myDB.productModel.find({ id_category: req.query.id_category }).populate('id_category')
            return res.status(200).json({
                msg: "Lọc theo id_category thành công",
                data: data,
            })
        }
        //api phân trang http://localhost:3000/product?limit=&page=
        if (req.query.limit && req.query.page) {
            let skip = (req.query.page - 1) * req.query.limit;
            let total = await myDB.productModel.countDocuments();
            let data = await myDB.productModel.find().skip(skip).limit(req.query.limit);
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
        let list = await myDB.productModel.find().populate('id_category')
        return res.status(200).json({
            msg: "Successful Data Product" ,
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
            let obj = new myDB.productModel()
            obj.name = req.body.name
            obj.price = req.body.price
            obj.id_category = req.body.id_category
            obj.quantity = req.body.quantity
            obj.description = req.body.description
            try {
                if(req.file){
                    fs.renameSync(req.file.path, './public/ImgProduct/'+ req.file.originalname)
                    obj.image = '/ImgProduct/' + req.file.originalname
                }
            } catch (error) {
                console.log("Lỗi đọc file " + error);
            }
            let new_prod = await obj.save()
            return res.status(201).json({
                msg: "Successful Add Product",
                data: new_prod
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
            let obj = await myDB.productModel.findById(req.params.id)
            try {
                if(req.file){
                    fs.renameSync(req.file.path, './public/ImgProduct/' + req.file.originalname)
                    obj.image = '/ImgProduct/' + req.file.originalname
                }
            } catch (error) {
                console.log("Lỗi đọc file " + error);
            }
            obj.name = req.body.name
            obj.price = req.body.price
            obj.id_category = req.body.id_category
            obj.quantity = req.body.quantity
            obj.description = req.body.description

            await myDB.productModel.findByIdAndUpdate(req.params.id, obj)
            return res.status(200).json({
                msg: "Successful Edit Product",
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
        await myDB.productModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            msg: " Successful Delete Product"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }
}