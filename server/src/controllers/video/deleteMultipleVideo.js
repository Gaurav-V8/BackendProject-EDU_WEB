const Video = require('../../models/video/video');


const fs = require('fs');
const path = require('path');

const deleteMultipleVideo = async(req, res)=>{
    try{
        const oldData = await Video.find({_id:{$in: req.body}});
        
        // oldData.forEach((item)=>{
        //     if(item.thumbnail){
        //         const oldfilepath = path.join('src', 'uploads', item.thumbnail);
        //         if(fs.existsSync(oldfilepath)){
        //             fs.unlinkSync(oldfilepath);
        //         }
        //     }
        // });

        const response = await Video.deleteMany({_id:{$in: req.body}});

        res.status(200).json({messsage: 'data deleted successfully', data: response});
    }
    catch(error){
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = deleteMultipleVideo;