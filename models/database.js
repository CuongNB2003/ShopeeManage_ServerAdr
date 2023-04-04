const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/quanLySanPham')
        .catch( (err)=>{
            console.log("loi ket noi server");
            console.log(err);
        })


module.exports = {mongoose}