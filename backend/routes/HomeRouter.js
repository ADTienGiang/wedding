const express =require("express") ;
const {
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
    deleteBannerContentService

  
} =require("../controllers/HomeController.js") ;
const routerHome = express.Router();
// test api
routerHome.get('/api/testApiHome',testApiHome);

// banner trang chủ
routerHome.post('/api/addBannerHome',addBannerHome);
routerHome.get('/api/getBannerHome',getBannerHome);
routerHome.delete('/api/deleteBannerHome/:id',deleteBannerHome);

// lời mở đầu trang chủ
routerHome.post('/api/addLoiMoDau',addLoiMoDau);
routerHome.get('/api/getLoiMoDau',getLoiMoDau);
// mô tả dịch vụ trang chủ
routerHome.post('/api/addMoTaDichVu',addMoTaDichVu);
routerHome.get('/api/getMoTaDichVu',getMoTaDichVu);
// thêm wedding
routerHome.post('/api/addWedding',addWedding);
routerHome.get('/api/getWedding',getWedding);
routerHome.put('/api/updateWedding/:id',updateWedding);
routerHome.delete('/api/deleteImage/:id',deleteImage);
// logo nhãn hàng
routerHome.post('/api/addLogoBrand',addLogoBrand);
routerHome.get('/api/getLogoBrand',getLogoBrand);
routerHome.delete('/api/deleteLogoBrand/:id',deleteLogoBrand);
// thông tin giới thiệu
routerHome.post('/api/addAbout',addAbout);
routerHome.get('/api/getAbout',getAbout);
routerHome.delete('/api/deleteImgAbout/:id',deleteImgAbout);
routerHome.delete('/api/deleteAbout/:id',deleteAbout);

// banner, tiêu đề, nội dung giới thiệu service
routerHome.post('/api/addBannerContentService',addBannerContentService);
routerHome.get('/api/getBannerContentService',getBannerContentService);
routerHome.delete('/api/deleteBannerContentService/:id',deleteBannerContentService);
module.exports = { 
    routerHome,
};
