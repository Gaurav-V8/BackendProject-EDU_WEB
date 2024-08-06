const express = require('express');
const { addCourse,
    readCourse,
    changeStatus,
    readSingleCourse,
    updateCourse,
    deleteSingleCourse,
    deleteMultipleCourse,
    searchCourses,
} = require('../../controllers/controllers');
const courseMulterFile = require('../../middelwares/course/courseMulter');


const courseRoutes = express.Router();

courseRoutes.post('/add_course', courseMulterFile, addCourse);
courseRoutes.get('/read_courses', readCourse);
courseRoutes.put('/change_course_status', changeStatus);
courseRoutes.get('/fetch_course_with_id/:_id', readSingleCourse);
courseRoutes.put('/update_course/:_id',courseMulterFile, updateCourse);
courseRoutes.delete('/delete_single_course/:_id', deleteSingleCourse);
courseRoutes.delete('/multi_delete', deleteMultipleCourse);
courseRoutes.get('/search_courses/:key',searchCourses);


module.exports = courseRoutes;