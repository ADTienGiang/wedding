const db = require('../models');
const Lienhe = db.lienhe;
const Chitietlienhe = db.chitietlienhe;
const multer = require('multer');
const env = require('dotenv').config();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({
    storage: storage
});

const addContact = (req, res) => {
    try {
        const uploadFields = upload.fields([{
                name: 'fileService',
                maxCount: 50
            },
            {
                name: 'filesThumbnail',
                maxCount: 1
            }
        ]);

        uploadFields(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh' + err
                });
            }
            const {
                id,
                tieude,
                duongdanchitiet,
                mota,
            } = req.body;
            const bannerUrl = req.files['filesThumbnail'] && req.files['filesThumbnail'][0] ? `${req.protocol}://${req.get('host')}/${req.files['filesThumbnail'][0].filename}` : null;
            const newDetailService = await Chitietblog.create({
                thumb: bannerUrl,
                tieude,
                mota,
                duongdanchitietblog: duongdanchitiet
            });
            const fileService = req.files['fileService'];
            for (const file of fileService) {
                const serviceImageUrl = `${req.protocol}://${req.get('host')}/${file.filename}`;
                await Hinhanhblog.create({
                    duongDan: serviceImageUrl,
                    idchitietblog: newDetailService.id
                });
            }
            return res.status(200).json({
                message: 'Tải lên hình ảnh và dữ liệu dịch vụ thành công'
            });
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu', error);
        return res.status(500).json({
            message: 'Cập nhật dịch vụ thất bại'
        });
    }
};
const addBannerContentContact = async (req, res) => {
    try {
        upload.array('avatar', 20)(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh'
                });
            }
            const {
                id,
                gioithieu,
                gioithieulienhe,
                sdt,
                email,
                diachi,
            } = req.body;
            const existingDichvu = await Lienhe.findByPk(id);
            console.log(existingDichvu);
            if (existingDichvu) {
                if (req.files && req.files.length > 0) {
                    existingDichvu.banner = `${req.protocol}://${req.get('host')}/${req.files[0].filename}`;
                }
                existingDichvu.gioithieu = gioithieu;
                existingDichvu.gioithieulienhe = gioithieulienhe;
                existingDichvu.sdt = sdt;
                existingDichvu.email = email;
                existingDichvu.diachi = diachi;
                await existingDichvu.save();
                return res.json({
                    message: "Cập nhật liên hệ thành công"
                });
            } else {
                console.log('ok ban ghi moi')
                let banner = null;
                if (req.files && req.files.length > 0) {
                    banner = `${req.protocol}://${req.get('host')}/${req.files[0].filename}`;
                }
                await Lienhe.create({
                    id: id,
                    gioithieu: gioithieu,
                    banner: banner,
                    gioithieulienhe,
                    sdt,
                    email,
                    diachi,
                });
                return res.json({
                    message: "Đã tạo mới liên hệ thành công"
                });
            }
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu', error);
        return res.status(500).json({
            message: 'Cập nhật liên hệ thất bại'
        });
    }
};

const getBannerContentContact = async (req, res) => {
    try {
        const banners = await Lienhe.findAll();
        res.json(banners);
    } catch (error) {
        return res.status(500).json({
            message: 'thất bại'
        });
    }
};
const getContact = async (req, res) => {
    try {
        const chitietlienhe = await Chitietlienhe.findAll({
            attributes: ['id', 'gioithieulienhe', 'sdt', 'email', 'diachi', 'createdAt', 'updatedAt'],
        });
        res.json(chitietlienhe);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "không lấy được contact" + error
        });
    }
};
const UpdateContact = async (req, res) => {
    try {
        const uploadFields = upload.fields([{
                name: 'fileService',
                maxCount: 50
            },
            {
                name: 'filesThumbnail',
                maxCount: 1
            }
        ]);

        uploadFields(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh' + err
                });
            }

            const {
                id,
                tieude,
                duongdanchitiet,
                mota
            } = req.body;
            // Tìm dịch vụ bằng ID để cập nhật
            const existingService = await Chitietblog.findByPk(id);
            if (!existingService) {
                return res.status(404).json({
                    message: 'Dịch vụ không tồn tại'
                });
            }

            // Cập nhật banner nếu có hình ảnh mới
            const bannerUrl = req.files['filesThumbnail'] && req.files['filesThumbnail'][0] ? `${req.protocol}://${req.get('host')}/${req.files['filesThumbnail'][0].filename}` : existingService.banner;

            // Cập nhật thông tin chi tiết dịch vụ
            await existingService.update({
                thumb: bannerUrl,
                tieude,
                mota,
                duongdanchitietblog: duongdanchitiet
            });
            const fileService = req.files['fileService'];
            if (fileService && fileService.length > 0) {
                for (const file of fileService) {
                    const serviceImageUrl = `${req.protocol}://${req.get('host')}/${file.filename}`;
                    await Hinhanhblog.create({
                        duongDan: serviceImageUrl,
                        idchitietblog: id
                    });
                }
            }

            return res.status(200).json({
                message: 'Cập nhật dịch vụ thành công'
            });
        });

    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu', error);
        res.status(500).json({
            error: 'Lỗi cập nhật dịch vụ' + error
        });
    }
};
const deleteImageContact = async (req, res) => {
    try {
        const imageId = req.params.id;
        const image = await Hinhanhblog.findOne({
            where: {
                id: imageId
            }
        });
        if (!image) {
            return res.status(404).json({
                message: 'Hình ảnh không tồn tại'
            });
        }
        await image.destroy();
        res.status(200).json({
            message: 'Đã xóa hình ảnh'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi xóa hình ảnh'
        });
    }
};

module.exports = {
    addContact,
    getContact,
    UpdateContact,
    deleteImageContact,
    addBannerContentContact,
    getBannerContentContact
};
