const express = require('express');
const { addVideo, readVideo, 
    deleteSingleVideo,
    deleteMultipleVideo,
    updateVideo,
    changeVideoStatus,

} = require('../../controllers/controllers');



const videoRoutes = express.Router();

videoRoutes.post('/add_video',addVideo);
videoRoutes.get('/read_video',readVideo);
videoRoutes.delete('/delete_single_video/:_id', deleteSingleVideo);
videoRoutes.delete('/multi_delete',deleteMultipleVideo);
videoRoutes.put('/update_video/:_id',updateVideo);
videoRoutes.put('/change_video_status',changeVideoStatus);



module.exports = videoRoutes;
