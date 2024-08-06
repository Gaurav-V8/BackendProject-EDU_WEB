const Users = require("../../models/user/user");


const fetchUser = async (req, res) => {
    try {
        const userdata = await Users.find();
        res.status(200).json({ message: "data fetched successfully", data: userdata });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};
module.exports = fetchUser;