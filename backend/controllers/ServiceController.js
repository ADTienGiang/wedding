const db = require('../models');
const Dichvu = db.dichvu;
const Chitietdichvu = db.chitietdichvu;
const Cacgoidichvu = db.cacgoidichvu;
const Hinhanhchitietdichvu = db.hinhanhchitietdichvu;
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

const addService = (req, res) => {
    try {
        const uploadFields = upload.fields([
            { name: 'fileService', maxCount: 50 },
            { name: 'filesThumbnail', maxCount: 1 } 
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
                tendichvu,
                duongdanchitiet,
                mota,
                tengoidichvu,
            } = req.body;
            const bannerUrl = req.files['filesThumbnail'] && req.files['filesThumbnail'][0] ? `${req.protocol}://${req.get('host')}/${req.files['filesThumbnail'][0].filename}` : null;
            const newDetailService = await Chitietdichvu.create({
                banner: bannerUrl,
                tendichvu,
                mota,
                duongdanchitiet
            });
            if (tengoidichvu) {
                for (const name of tengoidichvu) {
                    await Cacgoidichvu.create({
                        nhacungcap: name,
                        idchitietdichvu: newDetailService.id
                    });
                }
            }
            const fileService = req.files['fileService'];
            for (const file of fileService) {
                const serviceImageUrl = `${req.protocol}://${req.get('host')}/${file.filename}`;
                await Hinhanhchitietdichvu.create({
                    duongDan: serviceImageUrl,
                    idchitietdichvu: newDetailService.id
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


const getService = async (req, res) => {
    try {
        const chitietdichvu = await Chitietdichvu.findAll({
            attributes: ['id', 'tendichvu', 'mota','banner','duongdanchitiet', 'createdAt', 'updatedAt'], // Thêm các trường ngày tạo và cập nhật
            include: [{
                    model: Cacgoidichvu,
                    as: 'cacgoidichvu',
                    attributes: ['id', 'tengoidichvu', 'idchitietdichvu'],
                },
                {
                    model: Hinhanhchitietdichvu,
                    as: 'hinhanhchitietdichvu',
                    attributes: ['id', 'duongDan', 'idchitietdichvu'],
                }
            ],
            order: [
                ['id', 'ASC'], // Sắp xếp theo trường orderIndex
                [{ model: Cacgoidichvu, as: 'cacgoidichvu' }, 'id', 'ASC'], // Sắp xếp các gói dịch vụ theo ID
                [{ model: Hinhanhchitietdichvu, as: 'hinhanhchitietdichvu' }, 'id', 'ASC'] // Sắp xếp hình ảnh theo ID
            ]
        });
        res.json(chitietdichvu);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "không lấy được service" + error
        });
    }
};


const UpdateService = async (req, res) => {
    try {
        const uploadFields = upload.fields([
            { name: 'fileService', maxCount: 50 },
            { name: 'filesThumbnail', maxCount: 1 }
        ]);

        uploadFields(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh' + err
                });
            }

            const { id, tendichvu, duongdanchitiet, mota, tengoidichvu } = req.body;
            // Tìm dịch vụ bằng ID để cập nhật
            const existingService = await Chitietdichvu.findByPk(id);
            if (!existingService) {
                return res.status(404).json({ message: 'Dịch vụ không tồn tại' });
            }

            // Cập nhật banner nếu có hình ảnh mới
            const bannerUrl = req.files['filesThumbnail'] && req.files['filesThumbnail'][0] ? `${req.protocol}://${req.get('host')}/${req.files['filesThumbnail'][0].filename}` : existingService.banner;

            // Cập nhật thông tin chi tiết dịch vụ
            await existingService.update({
                banner: bannerUrl,
                tendichvu,
                mota,
                duongdanchitiet
            });

            // Cập nhật các gói dịch vụ, xóa các gói cũ và thêm mới từ yêu cầu
            if (tengoidichvu && Array.isArray(tengoidichvu)) {
                await Cacgoidichvu.destroy({ where: { idchitietdichvu: id } });
                for (const name of tengoidichvu) {
                    await Cacgoidichvu.create({
                        tengoidichvu: name,
                        idchitietdichvu: id
                    });
                }
            }
            // Cập nhật hình ảnh cho dịch vụ
            const fileService = req.files['fileService'];
            if (fileService && fileService.length > 0) {
                for (const file of fileService) {
                    const serviceImageUrl = `${req.protocol}://${req.get('host')}/${file.filename}`;
                    await Hinhanhchitietdichvu.create({
                        duongDan: serviceImageUrl,
                        idchitietdichvu: id
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
const deleteImageService = async (req, res) => {
    try {
      const imageId = req.params.id; 
      const image = await Hinhanhchitietdichvu.findOne({ where: { id: imageId } });
      if (!image) {
        return res.status(404).json({ message: 'Hình ảnh không tồn tại' });
      }
      await image.destroy();
      res.status(200).json({ message: 'Đã xóa hình ảnh' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa hình ảnh' });
    }
};
const deleteGoiDichVu = async (req, res) => {
    try {
      const imageId = req.params.id; 
      const image = await Cacgoidichvu.findOne({ where: { id: imageId } });
      if (!image) {
        return res.status(404).json({ message: 'gói dịch không tồn tại' });
      }
      await image.destroy();
      res.status(200).json({ message: 'Đã xóa gói dịch vụ' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa gói dịch vụ' });
    }
};
module.exports = {
    addService,
    getService,
    UpdateService,

    deleteImageService,
    deleteGoiDichVu
};
