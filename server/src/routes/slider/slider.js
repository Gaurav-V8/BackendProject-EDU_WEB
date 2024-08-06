
const express = require('express');
const { 
    deleteMultipleSlide,
    addSlide,
    readSlide,
    readSingleSlide,
    updateSlide,
    deleteSingleSlide,
    changeSlideStatus,
    
} = require('../../controllers/controllers');

const slideMulterFile = require('../../middelwares/slides/slideMulter');



const slideRoutes = express.Router();

slideRoutes.post('/add_slide', slideMulterFile, addSlide);
slideRoutes.get('/read_slide', readSlide);
slideRoutes.put('/change_slide_status', changeSlideStatus);
slideRoutes.get('/fetch_slide_with_id/:_id', readSingleSlide);
slideRoutes.put('/update_slide/:_id',slideMulterFile, updateSlide);
slideRoutes.delete('/delete_single_slide/:_id', deleteSingleSlide);
slideRoutes.delete('/multi_delete', deleteMultipleSlide);


module.exports = slideRoutes;
