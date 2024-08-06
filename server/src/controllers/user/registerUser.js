const User = require("../../models/user/user");
const otpSave = require("../../support/otpdata/otpMap");

const registerUser = async (req, res) => {
    try {
        // console.log(req.body);

        const SentOtp = otpSave.get(req.body.email);

        console.log(SentOtp, req.body.otp);

        if (!req.body.otp) return res.status(401).json({ message: 'please provide a OTP' });
        if (req.body.otp !== SentOtp) return res.status(401).json({ message: 'please provide a valid OTP' });

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ message: "user already exists" });


        const userdata = new User({
            email: req.body.email,
            password: req.body.password
        });

        const response = await userdata.save();

        console.log(response)

        const { password, ...filteredResponse } = response._doc


        res.status(200).json({ message: 'user register successfully', data: filteredResponse });

        otpSave.delete(req.body.email);

    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'user already exists' });
        }
        res.status(500).json({ message: 'internal server error' });

    }


};
module.exports = registerUser;