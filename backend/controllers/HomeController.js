const db = require('../models');
const Banner = db.banner;
const LoiMoDau = db.loimodau;
const moTaDichVu = db.motadichvu;
const Wedding = db.wedding;
const HinhanhWedding = db.HinhanhWedding;
const Part = db.part;
const Brand = db.brand;
const About = db.about;
const Partabout = db.partabout;
const Partaboutimg = db.partaboutimg;
const Dichvu = db.dichvu;
const Chitietdichvu = db.chitietdichvu;
const Cacgoidichvu = db.cacgoidichvu;
const Hinhanhchitietdichvu = db.hinhanhchitietdichvu;
const Footer = db.footer;
const sequelize = require('sequelize');
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
const testApiHome = async (req, res) => {
    try {
        const cat = await LoiMoDau.findAll();
        res.json(cat);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "không lấy được data"
        });
    }
};
const addBannerHome = async (req, res) => {
    try {
        upload.array('avatar', 20)(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh'
                });
            }
            const {
                kichthuoc
            } = req.body;
            console.log(req.body)
            const imgPromises = req.files.map(async (file) => {
                await Banner.create({
                    tenHinh: file.path,
                    kichthuoc,
                    duongDan: `${req.protocol}://${req.get('host')}/${file.filename}`,
                });
            });
            // Đợi tất cả các hình ảnh banner được thêm vào
            await Promise.all(imgPromises);
            return res.status(201).json({
                message: 'Thêm banner thành công'
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Thêm banner thất bại'
        });
    }
};
const getBannerHome = async (req, res) => {
    try {
        const banners = await Banner.findAll();
        res.json(banners);
    } catch (error) {
        return res.status(500).json({
            message: 'thất bại'
        });
    }
};
const deleteBannerHome = async (req, res) => {
    try {
        const bannerId = req.params.id; // Lấy bannerId từ tham số URL

        // Tìm banner cần xóa dựa trên bannerId
        const banner = await Banner.findOne({
            where: {
                id: bannerId
            }
        });

        // Kiểm tra xem banner có tồn tại không
        if (!banner) {
            return res.status(404).json({
                message: 'Banner không tồn tại'
            });
        }

        // Xóa banner khỏi cơ sở dữ liệu
        await banner.destroy();

        res.status(200).json({
            message: 'Banner đã được xóa thành công'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi xóa banner'
        });
    }
};
const addLoiMoDau = async (req, res) => {
    const {
        id,
        tieude,
        noidung
    } = req.body;

    // Kiểm tra tiêu đề nhập vào có hợp lệ hay không
    if (!tieude.trim()) {
        return res.json({
            message: "Thiếu thông tin tiêu đề"
        });
    }

    try {
        let cat;

        // Nếu không có ID, xem đây là lần đầu tiên và cần tạo mới
        if (!id) {
            // Tạo mới lời mở đầu
            cat = await LoiMoDau.create({
                tieude,
                noidung
            });
            return res.json({
                message: "Thêm mới lời mở đầu thành công",
                id: cat.id // Trả về ID của bản ghi mới để sử dụng cho các lần cập nhật sau
            });
        }

        // Nếu có ID, thực hiện cập nhật
        cat = await LoiMoDau.findByPk(id);
        if (cat) {
            cat.tieude = tieude;
            cat.noidung = noidung;
            await cat.save();
            return res.json({
                message: "Cập nhật lời mở đầu thành công"
            });
        } else {
            // Trường hợp không tìm thấy bản ghi với ID đã cho
            return res.status(404).json({
                message: "Không tìm thấy lời mở đầu để cập nhật"
            });
        }

    } catch (error) {
        console.error("Error when trying to add or update an introduction:", error);
        return res.status(500).json({
            message: "Không thể thêm hoặc cập nhật lời mở đầu"
        });
    }
};
const getLoiMoDau = async (req, res) => {
    try {
        const cat = await LoiMoDau.findAll();
        res.json(cat);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "không lấy được lời mở đầu"
        });
    }
};
const addMoTaDichVu = async (req, res) => {
    const {
        id,
        motadichvu
    } = req.body;

    // Kiểm tra tiêu đề nhập vào có hợp lệ hay không
    if (!motadichvu.trim()) {
        return res.json({
            message: "Thiếu thông tin tiêu đề"
        });
    }

    try {
        let cat;
        if (!id) {
            cat = await moTaDichVu.create({
                motadichvu
            });
            return res.json({
                message: "Thêm mới mô tả dịch vụ thành công",
                id: cat.id
            });
        }
        cat = await moTaDichVu.findByPk(id);
        if (cat) {
            cat.motadichvu = motadichvu;
            await cat.save();
            return res.json({
                message: "Cập nhật mô tả dịch vụ thành công"
            });
        } else {
            return res.status(404).json({
                message: "Không tìm thấy mô tả dịch vụ để cập nhật"
            });
        }
    } catch (error) {
        console.error("Error when trying to add or update an introduction:", error);
        return res.status(500).json({
            message: "Không thể thêm hoặc cập nhật mô tả dịch vụ"
        });
    }
};
const getMoTaDichVu = async (req, res) => {
    try {
        const cat = await moTaDichVu.findAll();
        res.json(cat);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "không lấy được mô tả dịch vụ"
        });
    }
};

const addWedding = (req, res) => {
    upload.fields([{
        name: 'images[]',
        maxCount: 20
    }, {
        name: 'banner',
        maxCount: 1
    }])(req, res, async function (err) {
        if (err) {
            return res.status(400).json({
                message: `Lỗi Multer: ${err.message}`
            });
        }
        try {
            const newWedding = await Wedding.create({
                tieude: req.body.tieude,
                capdoi: req.body.capdoi,
                quoctich: req.body.quoctich,
                ytuong: req.body.ytuong,
                soluongkhach: req.body.soluongkhach,
                diadiem: req.body.diadiem,
                duongdan: req.body.duongdan,
                theloai: req.body.theloai,
                trangthaihienthi: req.body.trangthaihienthi,
                banner: req.files['banner'] ? `${req.protocol}://${req.get('host')}/${req.files['banner'][0].filename}` : null
            });
            let sttCounter = 1;
            for (const [index, part] of req.body.parts.entries()) {
                const newPart = await Part.create({
                    idwedding: newWedding.id,
                    tieudephu: part.title,
                    noidung: part.content,
                    bocuc: part.layout,
                    stt: sttCounter++,
                });
                const images = req.files['images[]'] ? req.files['images[]'].filter(file => file.originalname.startsWith(`part${index}_`)) : [];
                await Promise.all(images.map(image => {
                    return HinhanhWedding.create({
                        idpart: newPart.id,
                        tenHinh: image.filename,
                        duongDan: `${req.protocol}://${req.get('host')}/${image.filename}`,
                        provider: 'wedding'
                    });
                }));
            }

            res.status(201).json({
                message: 'Thêm thông tin cưới thành công!',
                data: newWedding
            });
        } catch (error) {
            console.error('Lỗi khi thêm thông tin cưới:', error);
            res.status(500).json({
                message: 'Lỗi khi thêm thông tin cưới'
            });
        }
    });
};
const updateWedding = (req, res) => {
    upload.fields([{
        name: 'images[]',
        maxCount: 20
    }, {
        name: 'banner',
        maxCount: 1
    }])(req, res, async function (err) {
        if (err) {
            return res.status(400).json({
                message: `Lỗi Multer: ${err.message}`
            });
        }
        console.log(req.body)
        try {
            const weddingId = req.params.id;
            const wedding = await Wedding.findByPk(weddingId);

            if (!wedding) {
                return res.status(404).json({
                    message: 'Đám cưới không tồn tại'
                });
            }

            // Cập nhật thông tin cơ bản của đám cưới từ req.body
            const updatedWedding = {
                tieude: req.body.tieude,
                capdoi: req.body.capdoi,
                quoctich: req.body.quoctich,
                ytuong: req.body.ytuong,
                soluongkhach: req.body.soluongkhach,
                diadiem: req.body.diadiem,
                duongdan: req.body.duongdan,
                theloai: req.body.theloai,
                trangthaihienthi: req.body.trangthaihienthi,
                banner: req.files['banner'] ? `${req.protocol}://${req.get('host')}/${req.files['banner'][0].filename}` : null
            };
            await wedding.update(updatedWedding);

            // Kiểm tra và cập nhật các phần của đám cưới
            if (req.body.parts && Array.isArray(req.body.parts)) {
                for (const part of req.body.parts) {
                    let partToUpdate = await Part.findByPk(part.id);
                    if (partToUpdate) {
                        await partToUpdate.update({
                            tieudephu: part.title, // Cập nhật tên trường cho phù hợp
                            noidung: part.content, // Cập nhật tên trường cho phù hợp
                            bocuc: part.layout // Cập nhật tên trường cho phù hợp
                        });

                        // Xóa tất cả các hình ảnh cũ của phần
                        await HinhanhWedding.destroy({
                            where: {
                                idpart: partToUpdate.id
                            }
                        });

                        // Lấy danh sách hình ảnh mới từ req.files
                        const images = req.files['images[]'] ? req.files['images[]'].filter(file => file.originalname.startsWith(`part${partToUpdate.stt - 1}_`)) : [];
                        // Tạo hoặc cập nhật các bản ghi HinhanhWedding cho mỗi hình ảnh mới
                        await Promise.all(images.map(image => {
                            return HinhanhWedding.create({
                                idpart: partToUpdate.id,
                                tenHinh: image.filename,
                                duongDan: `${req.protocol}://${req.get('host')}/${image.filename}`,
                                provider: 'wedding'
                            });
                        }));
                    }
                }
            }

            res.status(200).json({
                message: 'Cập nhật thông tin cưới thành công!',
                data: updatedWedding
            });
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin cưới:', error);
            res.status(500).json({
                message: 'Lỗi khi cập nhật thông tin cưới'
            });
        }
    });
};

const addLogoBrand = async (req, res) => {
    try {
        upload.array('avatar', 20)(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh'
                });
            }
            const imgPromises = req.files.map(async (file) => {
                await Brand.create({
                    tenHinh: file.path,
                    duongDan: `${req.protocol}://${req.get('host')}/${file.filename}`,
                });
            });
            // Đợi tất cả các hình ảnh Brand được thêm vào
            await Promise.all(imgPromises);
            return res.status(201).json({
                message: 'Thêm Brand thành công'
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Thêm Brand thất bại'
        });
    }
};
const getLogoBrand = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.json(brands);
    } catch (error) {
        return res.status(500).json({
            message: 'thất bại'
        });
    }
};
const deleteLogoBrand = async (req, res) => {
    try {
        const bannerId = req.params.id; // Lấy bannerId từ tham số URL

        // Tìm banner cần xóa dựa trên bannerId
        const banner = await Brand.findOne({
            where: {
                id: bannerId
            }
        });

        // Kiểm tra xem banner có tồn tại không
        if (!banner) {
            return res.status(404).json({
                message: 'Banner không tồn tại'
            });
        }

        // Xóa banner khỏi cơ sở dữ liệu
        await banner.destroy();

        res.status(200).json({
            message: 'Banner đã được xóa thành công'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi xóa banner'
        });
    }
};
const addAbout = async (req, res) => {
    try {
        const uploadFields = upload.fields([
            { name: 'avatar[]', maxCount: 50 },
            { name: 'files', maxCount: 1 } 
        ]);
        // Sử dụng middleware upload để xử lý việc tải lên hình ảnh
        uploadFields(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh'
                });
            }
            const {
                loiMoDau,
                tieudechinh,
                avatar
            } = req.body;

            // Tìm kiếm xem có bản ghi About nào đã tồn tại hay không
            let existingAbout = await About.findOne({
                tieudechinh: tieudechinh
            });

            // Nếu không tìm thấy bản ghi About đã tồn tại, tạo một bản ghi mới
            if (!existingAbout) {
                const bannerUrl = req.files['files'] && req.files['files'][0] ? `${req.protocol}://${req.get('host')}/${req.files['files'][0].filename}` : null;
                existingAbout = await About.create({
                    tieudechinh: tieudechinh,
                    banner : bannerUrl
                });
            }

            // Thêm các phần mới vào bản ghi About đã tồn tại hoặc mới tạo
            await Promise.all(loiMoDau.map(async (part) => {
                const newPart = await Partabout.create({
                    idabout: existingAbout.id,
                    tieudephu: part.tieude,
                    noidung: part.noidung,
                });
                console.log(part.size)
                const matchingFiles = req.files['avatar[]'];
                if (matchingFiles && matchingFiles.length > 0) {
                    const matchingFile = matchingFiles[0];
                    await Partaboutimg.create({
                        partaboutid: newPart.id,
                        duongDan: `${req.protocol}://${req.get('host')}/${matchingFile.filename}`,
                    });
                } else {
                    console.log(`Không tìm thấy file phù hợp cho kích thước ${part.size}`);
                }
                
            }));

            // Trả về kết quả thành công
            return res.status(201).json({
                message: 'Thêm thông tin thành công',
            });
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi thêm thông tin:', error);
        return res.status(500).json({
            message: 'Thêm thông tin thất bại'
        });
    }
};
const deleteAbout = async (req, res) => {
    try {
        const bannerId = req.params.id; 
        const banner = await Partabout.findOne({
            where: {
                id: bannerId
            },
            include: [
                {
                    model: Partaboutimg,
                        as: 'partaboutimg'
                }
            ]
        });
        if (!banner) {
            return res.status(404).json({
                message: 'Banner không tồn tại'
            });
        }
        // Xóa tất cả các bản ghi liên quan trong bảng con Partabout và Partaboutimg
        await Partaboutimg.destroy({ where: { partaboutid: banner.id } });

        res.status(200).json({
            message: 'Banner đã được xóa thành công'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi xóa banner' + error
        });
    }
};


const getAbout = async (req, res) => {
    try {
        const cat = await About.findAll({
            include: [{
                model: Partabout,
                as: 'partabout',
                attributes: ['id', 'tieudephu', 'idabout', 'noidung'],
                include: [{
                    model: Partaboutimg,
                    as: 'partaboutimg',
                    attributes: ['id', 'partaboutid', 'duongDan'],
                }]
            }],
        });
        res.json(cat);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "không lấy được lời mở đầu"
        });
    }
};

const deleteImage = async (req, res) => {
    try {
        const weddingId = req.params.id;
        const wedding = await Wedding.findOne({
            where: {
                id: weddingId
            }
        });
        if (!wedding) {
            return res.status(404).json({
                message: 'Wedding không tồn tại'
            });
        }
        // Xóa trường banner từ wedding
        wedding.banner = null; // Đặt trường banner thành null hoặc giá trị mặc định tùy thuộc vào yêu cầu của ứng dụng của bạn
        await wedding.save();

        res.status(200).json({
            message: 'Đã xóa banner từ wedding'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi xóa banner từ wedding'
        });
    }
};


const getWedding = async (req, res) => {
    try {
        const wedding = await Wedding.findAll({
            include: [{
                model: Part,
                as: 'part',
                attributes: ['id', 'idwedding', 'bocuc', 'noidung', 'tieudephu', 'stt'],
                include: [{
                    model: HinhanhWedding,
                    as: 'HinhanhWedding',
                    attributes: ['id', 'tenHinh', 'duongDan', 'provider', 'idpart'],
                }]
            }],
        });
        res.json(wedding);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "không lấy được wedding" + error
        });
    }
};
const deleteImgAbout = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: ""
        });
    }
};

// const Dichvu = db.dichvu;
// const Chitietdichvu = db.chitietdichvu;
// const Cacgoidichvu = db.cacgoidichvu;
// const Hinhanhchitietdichvu = db.hinhanhchitietdichvu;
const addBannerContentService = async (req, res) => {
    try {
        upload.array('avatar', 20)(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: 'Lỗi tải lên hình ảnh'
                });
            }
            const {
                id,
                tieude,
                gioithieu
            } = req.body;
            console.log(req.body);
            const dichvu = await Dichvu.findByPk(id);
            if (dichvu) {
                if (req.files && req.files.length > 0) {
                    // Chỉ lấy hình ảnh đầu tiên trong danh sách files
                    dichvu.banner = `${req.protocol}://${req.get('host')}/${req.files[0].filename}`;
                }
                dichvu.tieude = tieude;
                dichvu.gioithieu = gioithieu;

                await dichvu.save();
                return res.json({
                    message: "Cập nhật lời mở đầu thành công"
                });
            } else {
                let banner = null;
                if (req.files && req.files.length > 0) {
                    banner = `${req.protocol}://${req.get('host')}/${req.files[0].filename}`;
                }
                await Dichvu.create({
                    id: id,
                    tieude : tieude,
                    gioithieu : gioithieu,
                    banner: banner
                });
            }
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu', error);
        return res.status(500).json({
            message: 'Cập nhật banner thất bại'
        });
    }
};


const getBannerContentService = async (req, res) => {
    try {
        const banners = await Dichvu.findAll();
        res.json(banners);
    } catch (error) {
        return res.status(500).json({
            message: 'thất bại'
        });
    }
};
const deleteBannerContentService = async (req, res) => {
    try {
        const bannerId = req.params.id; // Lấy bannerId từ tham số URL

        // Tìm banner cần xóa dựa trên bannerId
        const banner = await Banner.findOne({
            where: {
                id: bannerId
            }
        });

        // Kiểm tra xem banner có tồn tại không
        if (!banner) {
            return res.status(404).json({
                message: 'Banner không tồn tại'
            });
        }

        // Xóa banner khỏi cơ sở dữ liệu
        await banner.destroy();

        res.status(200).json({
            message: 'Banner đã được xóa thành công'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi xóa banner'
        });
    }
};


module.exports = {
    testApiHome,
    addBannerHome,
    getBannerHome,
    deleteBannerHome,

    addLoiMoDau,
    getLoiMoDau,

    addMoTaDichVu,
    getMoTaDichVu,

    addWedding,
    updateWedding,
    getWedding,
    deleteImage,

    addLogoBrand,
    getLogoBrand,
    deleteLogoBrand,

    addAbout,
    getAbout,
    deleteImgAbout,
    deleteAbout, 

    addBannerContentService,
    getBannerContentService,
    deleteBannerContentService,

    
};
