const express = require('express');
const adminRoutes = require('./routes/admin/adminRoutes');
const courseRoutes = require('./routes/course/course');
const teamRoutes = require('./routes/team/team');
const videoRoutes = require('./routes/video/video');
const slideRoutes = require('./routes/slider/slider');
const userRoutes = require('./routes/user/user');
const otpRouter = require('./routes/otp/otp');
const paymentRoutes = require('./routes/payment/payment');

require('./db/config');

const allRoutes = express.Router();

allRoutes.use('/admin', adminRoutes);
allRoutes.use('/course', courseRoutes);
allRoutes.use('/team', teamRoutes);
allRoutes.use('/video',videoRoutes);
allRoutes.use('/slide', slideRoutes);
allRoutes.use('/user', userRoutes);
allRoutes.use('/otp', otpRouter);
allRoutes.use('/payment',paymentRoutes);





module.exports = allRoutes;