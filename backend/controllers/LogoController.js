const db = require('../models');
const Logo = db.logo;
const multer = require('multer');
const env = require('dotenv').config();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục nơi bạn muốn lưu trữ tệp hình ảnh
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Đặt tên cho tệp hình ảnh dựa trên thời gian
    },
});
const upload = multer({
    storage: storage
});


const addLogo = async (req, res) => {
    try {
        upload.array('avatar', 20)(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: 'Lỗi tải lên logo'
                });
            }

            // Xóa tất cả các logo hiện tại
            await Logo.destroy({ where: {} });

            const imgPromises = req.files.map(async (file) => {
                await Logo.create({
                    tenHinh: file.path,
                    duongDan: `${req.protocol}://${req.get('host')}/${file.filename}`,
                });
            });

            await Promise.all(imgPromises);

            return res.status(201).json({
                message: 'Thêm logo thành công'
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Thêm logo thất bại'
        });
    }
};


const deleteLogo = async (req, res) => {
    try {
        const logoId = req.params.id; 
        const logo = await Logo.findOne({ where: { id: logoId } });
        if (!logo) {
            return res.status(404).json({ message: 'LOGO không tồn tại' });
        }
        await logo.destroy();
        res.status(200).json({ message: 'LOGO đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa LOGO' });
    }
};
const getLogo = async (req, res) => {
    try {
        const logo = await Logo.findAll();
        res.json(logo);
    } catch (error) {
        return res.status(500).json({
            message: 'thất bại'
        });
    }
};




module.exports = {
    addLogo,
    deleteLogo,
    getLogo,
};