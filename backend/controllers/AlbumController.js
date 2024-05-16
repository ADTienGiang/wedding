const db = require('../models');
const Theloai = db.theloai;
const Hanhtrinh = db.hanhtrinh;
const Hinhanhchitiethanhtrinh = db.hinhanhchitiethanhtrinh;
const Nhacungcap = db.nhacungcap;
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

const getAllCat = async (req, res) => {
    try {
        const cat = await Theloai.findAll();
        res.json(cat);
    } catch (error) {
        res.json("không lấy được danh mục ");
        console.log(error);
    }
};

const addCat = async (req, res) => 
{
    const {id,tentheloai} = req.body;
    try {
      const existingCat = await Theloai.findOne({ where: { tentheloai } });
        if(existingCat)
        {
            return res.json({ message: "Trùng danh mục không thể thêm "  });
        }
       
        if (tentheloai=='') {
            res.json({ message: "Thiếu thông tin danh mục "  });
            return;
        } 
        else
        {
            const cat = await Theloai.create( {id,tentheloai} );
         res.json({ message: " Thêm thành công "  });

        }
    } catch (error) {
        return res.status(401).json({ message: "Không thể thêm danh mục" });
    }

}

const updateCat = async (req, res) => {
    const { cat_name,duong_dan_category } = req.body;
    try {
        const existingCat = await Cat.findOne({ where: { cat_name } });
        if (cat_name == '') {
            res.status(201).json({ message: "Dữ liệu không thể rỗng" });
        }
        else if (existingCat && existingCat.id != req.params.id) {
            res.status(202).json({ message: "Dữ liệu trùng lặp" });
        }
        else {
            await Cat.update({ cat_name,duong_dan_category }, { where: { id: req.params.id } });
            res.status(200).json({ message: "Cập nhật thành công" });
        }

    } catch (error) {
        return res.status(401).json({ message: "Không thể câp nhập danh mục" });
    }
};

const deleteCat = async (req, res) => {

    const cat = await Cat.findOne({
        where: {
            id: req.params.id
        }   
    });
    if (!cat) return res.status(404).json({ message: "Không tìm thấy dữ liệu nào" });
    try {
        try {
            await Cat.destroy({
                where: {
                    id: req.params.id
                }
            });
        res.status(200).json({ message: "Xóa danh mục thành công" });
        } catch (error) {
            res.json({ message: "Danh mục đã có sản phẩm không thể xóa" });
        }
           
    } catch (error) {
        console.log(error.message);
    }
};
const addAlbum = (req, res) => {
    try {
        const uploadFields = upload.fields([
            { name: 'fileAlbum', maxCount: 50 },
            { name: 'filesBanner', maxCount: 1 } 
        ]);

        uploadFields(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh' + err
                });
            }
            console.log(req.body.nhacungcap1)
            const {
                id,
                id_category,
                tencapdoi,
                tenchude,
                mota,
                duongdanhanhtrinh,
                nhacungcap1
            } = req.body;
            const bannerUrl = req.files['filesBanner'] && req.files['filesBanner'][0] ? `${req.protocol}://${req.get('host')}/${req.files['filesBanner'][0].filename}` : null;
            const categoryExists = await Theloai.findByPk(id_category);
            if (!categoryExists) {
                return res.status(400).json({ message: 'ID thể loại không hợp lệ hoặc không tồn tại.' });
            }

            const newDetailService = await Hanhtrinh.create({
                banner: bannerUrl,
                idtheloai : id_category,
                tenchude,
                duongdanhanhtrinh,
                tencapdoi,
                mota
            });
            if (nhacungcap1) {
                for (const stringifiedObject of nhacungcap1) {
                  try {
                    const name = JSON.parse(stringifiedObject);
                    await Nhacungcap.create({
                      nhacungcap: name.nhacungcap,
                      linksocialnhacungcap: name.linksocialnhacungcap,
                      tennhacung: name.nhacungcap,
                      idhanhtrinh: newDetailService.id
                    });
                  } catch (error) {
                    console.error('Error parsing JSON', error);
                    return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
                  }
                }
            }
            const fileService = req.files['fileAlbum'];
            for (const file of fileService) {
                const serviceImageUrl = `${req.protocol}://${req.get('host')}/${file.filename}`;
                await Hinhanhchitiethanhtrinh.create({
                    duongDan: serviceImageUrl,
                    idhanhtrinh: newDetailService.id
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


const getAlbum = async (req, res) => {
    try {
        const album = await Hanhtrinh.findAll({
            attributes: ['id', 'idtheloai', 'tenchude','banner','duongdanhanhtrinh','tencapdoi','mota', 'createdAt', 'updatedAt'], 
            include: [{
                    model: Nhacungcap,
                    as: 'nhacungcap',
                    attributes: ['id', 'nhacungcap', 'tennhacung', 'linksocialnhacungcap', 'idhanhtrinh'],
                },
                {
                    model: Hinhanhchitiethanhtrinh,
                    as: 'hinhanhchitiethanhtrinh',
                    attributes: ['id', 'duongDan', 'idhanhtrinh'],
                }
            ],
            order: [
                ['id', 'ASC'],
                [{ model: Nhacungcap, as: 'nhacungcap' }, 'id', 'ASC'], 
                [{ model: Hinhanhchitiethanhtrinh, as: 'hinhanhchitiethanhtrinh' }, 'id', 'ASC']
            ]
        });
        res.json(album);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "không lấy được service" + error
        });
    }
};


const UpdateAlbum = async (req, res) => {
    try {
        const uploadFields = upload.fields([
            { name: 'fileAlbum', maxCount: 50 },
            { name: 'filesBanner', maxCount: 1 }
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
                id_category,
                tencapdoi,
                tenchude,
                mota,
                duongdanhanhtrinh,
                nhacungcap1  
            } = req.body;
            const existingAlbum = await Hanhtrinh.findByPk(id);
            if (!existingAlbum) {
                return res.status(404).json({ message: 'Album không tồn tại' });
            }
            const bannerUrl = req.files['filesBanner'] && req.files['filesBanner'][0]
                ? `${req.protocol}://${req.get('host')}/${req.files['filesBanner'][0].filename}`
                : existingAlbum.banner;
            await existingAlbum.update({
                banner: bannerUrl,
                idtheloai: id_category,
                tenchude,
                duongdanhanhtrinh,
                tencapdoi,
                mota
            });
            if (nhacungcap1 && nhacungcap1.length > 0) {
                await Nhacungcap.destroy({ where: { idhanhtrinh: id } });
                for (const stringifiedObject of nhacungcap1) {
                    const name = JSON.parse(stringifiedObject);
                    await Nhacungcap.create({
                        nhacungcap: name.nhacungcap,
                        linksocialnhacungcap: name.linksocialnhacungcap,
                        tennhacung: name.tennhacung,
                        idhanhtrinh: id
                    });
                }
            }
            const fileAlbum = req.files['fileAlbum'];
            if (fileAlbum && fileAlbum.length > 0) {
                for (const file of fileAlbum) {
                    const albumImageUrl = `${req.protocol}://${req.get('host')}/${file.filename}`;
                    await Hinhanhchitiethanhtrinh.create({
                        duongDan: albumImageUrl,
                        idhanhtrinh: id
                    });
                }
            }
            return res.status(200).json({
                message: 'Cập nhật album thành công'
            });
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật album', error);
        res.status(500).json({
            message: 'Lỗi cập nhật album' + error
        });
    }
};

const deleteImageAlbum = async (req, res) => {
    try {
      const imageId = req.params.id; 
      const image = await Hinhanhchitiethanhtrinh.findOne({ where: { id: imageId } });
      if (!image) {
        return res.status(404).json({ message: 'Hình ảnh không tồn tại' });
      }
      await image.destroy();
      res.status(200).json({ message: 'Đã xóa hình ảnh' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa hình ảnh' });
    }
};
const deleteNhaCungCap = async (req, res) => {
    try {
      const imageId = req.params.id; 
      const image = await Nhacungcap.findOne({ where: { id: imageId } });
      if (!image) {
        return res.status(404).json({ message: 'gói dịch không tồn tại' });
      }
      await image.destroy();
      res.status(200).json({ message: 'Đã xóa gói dịch vụ' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa gói dịch vụ' });
    }
};

const deleteBannerAlbum = async (req, res) => {
    try {
        const bannerId = req.params.id; 
        const album = await Hanhtrinh.findOne({
            where: {
                id: bannerId
            }
        });

        // Kiểm tra xem album có tồn tại không
        if (!album) {
            return res.status(404).json({
                message: 'Album không tồn tại'
            });
        }

        // Cập nhật banner thành giá trị rỗng
        await album.update({ banner: null });

        res.status(200).json({
            message: 'Banner đã được xóa thành công'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi xóa banner'
        });
    }
};
const deleteAlbum = async (req, res) => {
    try {
        const hanhTrinhId = req.params.id;
        const hanhTrinh = await Hanhtrinh.findByPk(hanhTrinhId);

        // Kiểm tra xem hành trình có tồn tại không
        if (!hanhTrinh) {
            return res.status(404).json({
                message: 'Hành trình không tồn tại'
            });
        }

        // Xóa các hình ảnh chi tiết hành trình liên quan
        await Hinhanhchitiethanhtrinh.destroy({
            where: { idhanhtrinh: hanhTrinhId }
        });

        // Xóa các nhà cung cấp liên quan
        await Nhacungcap.destroy({
            where: { idhanhtrinh: hanhTrinhId }
        });

        // Sau khi xóa các bảng con, xóa hành trình
        await hanhTrinh.destroy();

        res.status(200).json({
            message: 'Hành trình đã được xóa thành công'
        });
    } catch (error) {
        console.error('Lỗi khi xóa hành trình:', error);
        res.status(500).json({
            message: 'Lỗi khi xóa hành trình'
        });
    }
};


module.exports = {
    getAllCat,
    addCat,
    updateCat,
    deleteCat,

    addAlbum,
    getAlbum,
    UpdateAlbum,
    deleteAlbum,
    deleteImageAlbum,
    deleteNhaCungCap,

    deleteBannerAlbum
};
