const express =require("express") ;
const {
    addLogo,
    deleteLogo,
    getLogo,
  
} =require("../controllers/LogoController.js") ;
const routerLogo = express.Router();
// logo
routerLogo.post('/api/addLogo',addLogo);
routerLogo.get('/api/getLogo',getLogo);
routerLogo.delete('/api/deleteLogo/:id',deleteLogo);
module.exports = { 
    routerLogo,
};
