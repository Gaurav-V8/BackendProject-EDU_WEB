const Admin = require("../../models/admin/admin");
require('dotenv').config();

let ifRegistred = false;

const registerAdmin = async () => {

    if(ifRegistred) return;

    const ifAdmin = await Admin.find();

    // if(ifAdmin.length !== 0) return console.log(ifAdmin[0]);

    let mail = process.env.ADMIN_EMAIL;
    let password = process.env.ADMIN_PASSWORD;

    if (!mail || !password) return console.log('plaese set ADMIN_EMAIL and ADMIN_PASSWORD in .env file');

    const adminData = new Admin({
        mail,
        password
    });

    const response = await adminData.save();

    // console.log(response);

    ifRegistred = true;
};

module.exports = registerAdmin;