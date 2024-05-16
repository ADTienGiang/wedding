const db = require('../models');
const Video = db.video;
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

const addVideo = (req, res) => {
    try {
        const uploadFields = upload.fields([{
            name: 'filesBanner',
            maxCount: 1
        }]);

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
                tencapdoi,
                tieude,
                linkyt,
            } = req.body;
            const bannerUrl = req.files['filesBanner'] && req.files['filesBanner'][0] ? `${req.protocol}://${req.get('host')}/${req.files['filesBanner'][0].filename}` : null;
            const newDetailService = await Video.create({
                banner: bannerUrl,
                linkyt,
                tieude,
                tencapdoi,
            });
            return res.status(200).json({
                message: 'Tải lên hình ảnh và dữ liệu video thành công'
            });
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu', error);
        return res.status(500).json({
            message: 'Cập nhật video thất bại'
        });
    }
};

const getVideo = async (req, res) => {
    try {
        const video = await Video.findAll();
        res.json(video);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "không lấy được video" + error
        });
    }
};


const UpdateVideo = async (req, res) => {
    try {
        const uploadFields = upload.fields([{
            name: 'filesBanner',
            maxCount: 1
        }]);

        uploadFields(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh' + err
                });
            }
            const {
                id,
                tencapdoi,
                tieude,
                linkyt,
            } = req.body;
            const existingAlbum = await Video.findByPk(id);
            if (!existingAlbum) {
                return res.status(404).json({
                    message: 'Video không tồn tại'
                });
            }
            const bannerUrl = req.files['filesBanner'] && req.files['filesBanner'][0] ?
                `${req.protocol}://${req.get('host')}/${req.files['filesBanner'][0].filename}` :
                existingAlbum.banner;
            await existingAlbum.update({
                banner: bannerUrl,
                id,
                tencapdoi,
                tieude,
                linkyt,
            });
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

const deleteBannerVideo = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const album = await Video.findOne({
            where: {
                id: bannerId
            }
        });
        if (!album) {
            return res.status(404).json({
                message: 'video không tồn tại'
            });
        }
        await album.update({
            banner: null
        });

        res.status(200).json({
            message: 'video đã được xóa thành công'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi xóa video'
        });
    }
};
const deleteVideo = async (req, res) => {
    try {
        const hanhTrinhId = req.params.id;
        const hanhTrinh = await Video.findByPk(hanhTrinhId);
        if (!hanhTrinh) {
            return res.status(404).json({
                message: 'video không tồn tại'
            });
        }
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
    addVideo,
    getVideo,
    UpdateVideo,
    deleteVideo,
    deleteBannerVideo
};
