const { Db } = require('mongodb');
var DB = require('../data/database');

const userSchema = new DB.mongoose.Schema(
    {
        avata       : {type : String  , require : false },
        username    : {type : String  , require : true  },
        password    : {type : String  , require : true  },
        fullname    : {type : String  , require : false },
        age         : {type : Number  , require : false },
        email       : {type : String  , require : false },
        phone       : {type : String  , require : false },
        address     : {type : String  , require : false },
        acc_status  : {type : Boolean , require : true, default: true},
        id_role : {type : DB.mongoose.Schema.Types.ObjectId , ref : 'roleModel'},
    },
    {
        collection : 'Tb_User'
    }
)
let userModel = DB.mongoose.model('userModel' , userSchema);

const roleSchema = new DB.mongoose.Schema(
    {
        name   : { type : String , require : true}, 
        status : { type : String, require : true }
    },
    {
        collection : 'Tb_Role'
    }
)
let roleModel = DB.mongoose.model('roleModel', roleSchema)


module.exports = {userModel, roleModel}