const session  = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const cors  = require("cors");
require('./Config/connect');
const app = express();

const {routerHome} = require('./routes/HomeRouter.js');
const {routerService} = require('./routes/ServiceRouter.js');
const {routerBlog} = require('./routes/BlogRouter.js');
const {routerAlBum} = require('./routes/AlBumRouter.js');
const {routerLogo} = require('./routes/LogoRouter.js');
const {routerVideo} = require('./routes/VideoRouter.js');
const {routerContact} = require('./routes/ContactRouter.js');
// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

//session 
app.use(session({
  secret: 'keysaveloginuser123456', 
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser()); //Parse cookie
app.use(cors());
// Sử dụng passport và express.json middleware
app.use(passport.session());
app.use(express.json());

// Định tuyến
app.use(routerHome);
app.use(routerService);
app.use(routerAlBum);
app.use(routerLogo);
app.use(routerVideo);
app.use(routerBlog);
app.use(routerContact);
// Serve các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"));
// 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
// Khởi động máy chủ
const port = 3000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
