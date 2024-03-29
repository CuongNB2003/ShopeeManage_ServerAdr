var DB = require('../data/database');

const categorySchema = new DB.mongoose.Schema(
    {
        name : {type : String , require : true}
    },
    {
        collection : 'Tb_Category'
    }
)
let categoryModel = DB.mongoose.model('categoryModel', categorySchema);

const productSchema = new DB.mongoose.Schema(
    {
        name : {type : String , require : true},
        id_category : {type : DB.mongoose.Schema.Types.ObjectId , ref : 'categoryModel'},
        image : {type : String , require : false},
        description : {type : String , require : false},
        price : {type : Number , require : true, default:0},
        quantity : {type : Number , require : true}
    },
    {
        collection : 'Tb_Product'
    }
)
let productModel = DB.mongoose.model('productModel' , productSchema);


module.exports = {categoryModel , productModel}