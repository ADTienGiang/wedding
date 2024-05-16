const express =require("express") ;
const {
    addBlog,
    getBlog,
    UpdateBlog,
    deleteImageBlog,
    addBannerContentBlog,
    getBannerContentBlog
  
} =require("../controllers/BlogController.js") ;
const routerBlog = express.Router();
routerBlog.post('/api/addBlog',addBlog);
routerBlog.get('/api/getBlog',getBlog);
routerBlog.put('/api/UpdateBlog/:id',UpdateBlog);
routerBlog.delete('/api/deleteImageBlog/:id',deleteImageBlog);
routerBlog.post('/api/addBannerContentBlog',addBannerContentBlog);
routerBlog.get('/api/getBannerContentBlog',getBannerContentBlog);

module.exports = { 
    routerBlog,
};
