const express =require("express") ;
const {
    addService,
    getService,
    UpdateService,
    deleteImageService,
    deleteGoiDichVu
  
} =require("../controllers/ServiceController.js") ;
const routerService = express.Router();
// banner trang chủ
routerService.post('/api/addService',addService);
routerService.get('/api/getService',getService);
routerService.put('/api/UpdateService/:id',UpdateService);
// xóa hình ảnh
routerService.delete('/api/deleteImageService/:id',deleteImageService);
// xóa gói dịch vụ
routerService.delete('/api/deleteGoiDichVu/:id',deleteGoiDichVu);

module.exports = { 
    routerService,
};
