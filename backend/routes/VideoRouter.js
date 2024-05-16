const express =require("express") ;
const {
    addVideo,
    getVideo,
    UpdateVideo,
    deleteVideo,
    deleteBannerVideo
} =require("../controllers/videoControler.js") ;
const routerVideo = express.Router();
// video
routerVideo.post('/api/addVideo',addVideo);
routerVideo.get('/api/getVideo',getVideo);
routerVideo.put('/api/UpdateVideo/:id',UpdateVideo);
routerVideo.delete('/api/deleteVideo/:id',deleteVideo);
routerVideo.delete('/api/deleteBannerVideo/:id',deleteBannerVideo);

module.exports = { 
    routerVideo,
};
