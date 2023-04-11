var myMD = require('../../models/db.model')

exports.listProDuct = async (req, res, next) => {
    try {
        let listSP = await myMD.sanPhamModel.find().populate('id_theloai');
        if (listSP) {
            return res.status(200).json(
                {
                    msg: 'lấy dữ liệu thành công',
                    data: listSP
                }
            )
        } else {
            return res.status(204).json(
                {
                    msg: 'Không có dữ liệu'
                }
            )
        }
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        })
    }
}

exports.timKiemSP = async (req, res, next) =>{
    var id = req.params.id; // Lấy ID từ đường dẫn
    try {
        let data = await product.productModel.findById(id).populate('id_theloai');
        console.log(data);
        if (data) {
            return res.status(200).json(
                {
                    msg: 'get data',
                    data: data
                }
            );
        } else {
            return res.status(404).json({ msg: 'Not Found' });
        }
    } catch (error) {
        return res.status(error.status).json(
            {
                msg: error.message
            }
        )
    }
}