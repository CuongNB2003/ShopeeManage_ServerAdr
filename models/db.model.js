var db = require('./database');
const bcrypt = require("bcrypt");  // cài npm install bcrypt  --save
// bảng sản phẩm
const sanPhamSchema = new db.mongoose.Schema(
    {
        image: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        desc: { type: String, required: false },
        id_theloai: { type: db.mongoose.Schema.Types.ObjectId, ref: 'theLoaiModel' },
    },
    {
        collection: 'tb_san_pham'
    }
)
let sanPhamModel = db.mongoose.model('sanPhamModel', sanPhamSchema);

// bảng thể loại
const theLoaiSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true }
    },
    {
        collection: 'tb_the_loai'
    }
)
let theLoaiModel = db.mongoose.model('theLoaiModel', theLoaiSchema);

// bảng user
const userSchema = new db.mongoose.Schema(
    {
        avata: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        fullname: { type: String, required: false },
        email: { type: String, required: false },
        role: { type: Boolean, required: true },
    },
    {
        collection: 'tb_user'
    }
)
// dùng cho đăng nhập: 
userSchema.statics.findByCredentials = async (username, password) => {

    const user = await userModel.findOne({ username });
    if (!user) {
        throw new Error('Không tồn tại user');
    }
    if(user.password != password){
        console.log('sai pass');
        throw new Error('Sai password');
    }
    
    return user;
}
let userModel = db.mongoose.model('userModel', userSchema);


module.exports = { theLoaiModel, sanPhamModel, userModel }