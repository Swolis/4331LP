// adminRouter.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/AdminLoginController');

router.post('/adminLogin', loginController.login);

module.exports = router;
