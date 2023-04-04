var db = require('./database');

// bảng sản phẩm
const sanPhamSchema = new db.mongoose.Schema(
    {
        image:      { type: String,                             required: true },
        name:       { type: String,                             required: true },
        price:      { type: Number,                             required: true },
        desc:       { type: String,                             required: false },
        id_theloai: { type: db.mongoose.Schema.Types.ObjectId,  ref: 'theLoaiModel' },
    },
    {
        collection: 'tb_san_pham'
    }
)
let sanPhamModel = db.mongoose.model('sanPhamModel', sanPhamSchema);

// bảng thể loại
const theLoaiSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true}
    },
    {
        collection: 'tb_the_loai'
    }
)
let theLoaiModel = db.mongoose.model('theLoaiModel', theLoaiSchema);

// bảng user
const userSchema = new db.mongoose.Schema(
    {
        avata:      { type: String,     required: true},
        username:   { type: String,     required: true},
        password:   { type: String,     required: true},
        fullname:   { type: String,     required: true},
        email:      { type: String,     required: true},
        role:       { type: Boolean,    required: true},
    },
    {
        collection: 'tb_user'
    }
)
let userModel = db.mongoose.model('userModel', userSchema);


module.exports = {theLoaiModel, sanPhamModel, userModel}