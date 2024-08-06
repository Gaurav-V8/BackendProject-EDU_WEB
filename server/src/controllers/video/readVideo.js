const Video = require("../../models/video/video");

const readVideo = async (req, res) => {
    try {
        const response = await Video.find();
        res.status(200).json({ message: 'data fetched successfully', data: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });

    }
};
module.exports = readVideo;