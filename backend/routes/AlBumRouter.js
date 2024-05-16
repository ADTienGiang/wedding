const express =require("express") ;
const {
    getAllCat,
    addCat,
    updateCat,
    deleteCat,


    addAlbum,
    getAlbum,
    UpdateAlbum,
    deleteImageAlbum,
    deleteNhaCungCap,
    deleteAlbum,
    deleteBannerAlbum
  
} =require("../controllers/AlbumController.js") ;
const routerAlBum = express.Router();
// thể loại hành trình
routerAlBum.post('/api/addCat',addCat);
routerAlBum.get('/api/getAllCat',getAllCat);
routerAlBum.put('/api/updateCat/:id',updateCat);
routerAlBum.delete('/api/deleteCat/:id',deleteCat);
routerAlBum.delete('/api/deleteAlbum/:id',deleteAlbum);
// album
routerAlBum.post('/api/addAlbum',addAlbum);
routerAlBum.get('/api/getAlbum',getAlbum);
routerAlBum.put('/api/UpdateAlbum/:id',UpdateAlbum);
routerAlBum.delete('/api/deleteImageAlbum/:id',deleteImageAlbum);
routerAlBum.delete('/api/deleteNhaCungCap/:id',deleteNhaCungCap);
// delete banner album
routerAlBum.delete('/api/deleteBannerAlbum/:id',deleteBannerAlbum);
module.exports = { 
    routerAlBum,
};
