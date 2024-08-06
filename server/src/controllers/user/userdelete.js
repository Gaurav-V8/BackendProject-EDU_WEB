const User = require("../../models/user/user");

const userDelete = async (req, res) => {
    try {
        const id = req.params;
        
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).json({ message: 'please provoide a valid course id' });

        res.status(200).json({ message: 'user deleted successfuly', data: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting user" });
    }
};
module.exports = userDelete;
