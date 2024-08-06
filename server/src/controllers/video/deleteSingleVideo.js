const Video = require("../../models/video/video");




const deleteSingleVideo = async(req, res)=>{
    try{
        const response = await Video.findByIdAndDelete(req.params);

        if(!response) return res.status(404).json({message: 'please provoide a valid video id'});

        res.status(200).json({message: 'video deleted successfully', data : response})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = deleteSingleVideo;