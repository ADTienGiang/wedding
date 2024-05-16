const db = require('../models');
const Admin = db.Admins;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const loginAdmin = async (req, res) => {
  try {
    const { tenTaiKhoan, MatKhau } = req.body;
    if (!tenTaiKhoan || !MatKhau) {
      return res.status(400).json({ message: 'Tên tài khoản và mật khẩu không được để trống' });
    }

    const admin = await Admin.findOne({ where: { tenTaiKhoan, MatKhau } });
    if (!admin) {
      return res.status(401).json({ message: 'Tên tài khoản hoặc mật khẩu không đúng' });
    }

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({ message: 'Đăng nhập thành công', token, admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

const getadmin = async (req, res) => {
  try {
    const cat = await Admin.findAll();
    res.json(cat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Không lấy được danh mục" });
  }
};

module.exports = {
  loginAdmin,
  getadmin
};
