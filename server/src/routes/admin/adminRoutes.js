const express = require('express');
const { adminLogin } = require('../../controllers/controllers');

const adminRoutes = express.Router();


adminRoutes.post('/login', adminLogin);

module.exports = adminRoutes;