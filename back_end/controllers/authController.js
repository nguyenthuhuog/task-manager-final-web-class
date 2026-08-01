const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");

require("dotenv").config();
const SECRET = process.env.JWT_SECRET;


/* ===========================
   REGISTER
=========================== */

async function register(req, res) {

    try {

        const {

            username,

            password,

        } = req.body;

        if (!username || !password) {

            return res.status(400).json({

                message: "Thiếu username hoặc password."

            });

        }

        const existed = await UserModel.findByUsername(username);

        if (existed) {

            return res.status(409).json({

                message: "Tên đăng nhập đã tồn tại."

            });

        }

        const hash = await bcrypt.hash(password, 10);

        const result = await UserModel.createUser(

            username,

            hash,

        );

        res.status(201).json({

            message: "Đăng ký thành công.",

            id: result.id

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Lỗi server."

        });

    }

}



/* ===========================
   LOGIN
=========================== */

async function login(req, res) {

    try {

        const {

            username,

            password

        } = req.body;

        if (!username || !password) {

            return res.status(400).json({

                message: "Thiếu thông tin đăng nhập."

            });

        }

        const user = await UserModel.findByUsername(username);

        if (!user) {

            return res.status(401).json({

                message: "Sai tài khoản hoặc mật khẩu."

            });

        }

        const ok = await bcrypt.compare(

            password,

            user.password

        );

        if (!ok) {

            return res.status(401).json({

                message: "Sai tài khoản hoặc mật khẩu."

            });

        }

        const token = jwt.sign(

            {

                id: user.id,

                username: user.username

            },

            SECRET,

            {

                expiresIn: "24h"

            }

        );

        res.json({
            success:true,

            message: "Đăng nhập thành công.",

            token,

            user: {

                id: user.id,

                username: user.username

            }

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Lỗi server."

        });

    }

}



/* ===========================
   GET PROFILE
=========================== */

async function profile(req, res) {

    try {

        const user = await UserModel.findById(

            req.user.id

        );

        res.json(user);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Không lấy được thông tin."

        });

    }

}



module.exports = {

    register,

    login,

    profile

};