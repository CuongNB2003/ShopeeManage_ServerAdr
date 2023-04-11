var myMD = require('../../models/db.model')

exports.dangNhap = async (req, res, next) => {
    try {
        const user = await myMD.userModel.findByCredentials(req.body.username, req.body.passwd);
        if (!user) {
            return res.status(401)
                    .json({error: 'Sai thông tin đăng nhập'});
        }
        // // đăng nhập thành công, tạo token làm việc mới
        // await user.generateAuthToken();

        return res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {msg: error.message}
        );
    }
}

exports.dangKy = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt, req.body);
        const user = new myMD.userModel(req.body);

        user.passwd = await bcrypt.hash(req.body.passwd, salt);
 
        // user.token = await user.generateAuthToken();
        console.log(req.file);
        // lưu ảnh và tạo đường dẫn ảnh nếu có
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/upload/'+req.file.originalname);
                user.image = '/upload/' + req.file.originalname;
            }
        } catch (error) {
            console.log(error);
        }

        let new_u = await user.save()

        return res.status(201).json({ user: new_u })

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error.message})
    }
}

exports.doiMatKhau = async (req, res, next) => {
    try {
        // const user = await model.userModel.findOne({token: req.body.token});
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/upload/'+req.file.originalname);
                user.image = '/upload/' + req.file.originalname;
            }
        } catch (error) {
            console.log(error);
        }
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        const updatedUser = await user.save();
        res.send(updatedUser);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error' });
      }
}

exports.doiThongTin = async (req, res, next) => {
    try {
        const user = await model.userModel.findOne({token: req.body.token});
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/upload/'+req.file.originalname);
                user.image = '/upload/' + req.file.originalname;
            }
        } catch (error) {
            console.log(error);
        }
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        const updatedUser = await user.save();
        res.send(updatedUser);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error' });
      }
}

exports.dangXuat = async (req, res, next) => {
    try {
        console.log( req.user);
        // req.user.generateAuthToken();
        // req.user.token = null; //xóa token
        await req.user.save()
        return res.status(200).json({msg: 'Đăng xuất thành công'});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}