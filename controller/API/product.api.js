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