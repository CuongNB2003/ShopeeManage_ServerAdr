var myMD = require('../../models/db.model')

exports.listCategory = async (req, res, next) => {
    try {
        let listTL = await myMD.theLoaiModel.find();
        if (listTL) {
            return res.status(200).json(
                {
                    msg: 'lấy dữ liệu thành công',
                    data: listTL
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