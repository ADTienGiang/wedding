const express =require("express") ;
const {
    addContact,
    getContact,
    UpdateContact,
    deleteImageContact,
    addBannerContentContact,
    getBannerContentContact
} =require("../controllers/ContactController.js") ;
const routerContact = express.Router();
routerContact.post('/api/addContact',addContact);
routerContact.get('/api/getContact',getContact);
routerContact.put('/api/UpdateContact/:id',UpdateContact);
routerContact.delete('/api/deleteImageContact/:id',deleteImageContact);
routerContact.post('/api/addBannerContentContact',addBannerContentContact);
routerContact.get('/api/getBannerContentContact',getBannerContentContact);
module.exports = { 
    routerContact,
};
