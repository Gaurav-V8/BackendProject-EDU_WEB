const express = require('express');
const generateOtp = require('../../controllers/otp/generateOTP');


const otpRouter = express.Router();

otpRouter.post('/generate_otp', generateOtp);


module.exports = otpRouter;