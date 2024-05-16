const express = require('express');
const { loginAdmin,getadmin } = require('../controllers/AdminController');
const routerAdmin = express.Router();

// Tuyến router cho đăng nhập admin
routerAdmin.post('/api/admin/login', loginAdmin);
routerAdmin.get('/api/getadmin', getadmin);
routerAdmin.get('/', function(req, res) {
    res.json({ message: 'Welcome to my API.' });
  });

module.exports = routerAdmin;
