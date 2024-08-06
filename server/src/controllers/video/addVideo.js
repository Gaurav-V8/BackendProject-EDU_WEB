const Video = require("../../models/video/video");

const addVideo = async (req, res) => {
    try {
        console.log(req.body);
        const data = new Video(req.body);
        const response = await data.save();
        // console.log(response);
        res.status(200).json({ message: 'data inserted successfully', response });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};
module.exports = addVideo;