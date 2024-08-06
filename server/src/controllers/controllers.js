const adminLogin = require('./admin/adminLogin');
const registerAdmin = require('./admin/resgisterAdmin');

// course
const addCourse = require('./course/addCourse');
const changeStatus = require('./course/changeStatus');
const deleteMultipleCourse = require('./course/deleteMultipleCourse');
const deleteSingleCourse = require('./course/deleteSingleCourse');
const readCourse = require('./course/readCourse');
const readSingleCourse = require('./course/readSingleCourse');
const updateCourse = require('./course/updateCourse');
const searchCourses = require('./course/searchCourse');

// team
const addTeam = require('./team/addteam');
const changeTrueStatus = require('./team/changeTrueStatus');
const deleteMultipleTeam = require('./team/deleteMultipleTeam');
const deleteSingleTeam = require('./team/deleteSingleTeam');
const readSingleTeam = require('./team/readSingleteam');
const readTeam = require('./team/readTeam');
const updateTeam = require('./team/updateTeam');

// video

const addVideo = require('./video/addVideo');
const changeVideoStatus = require('./video/changeVideoStatus');
const deleteMultipleVideo = require('./video/deleteMultipleVideo');
const deleteSingleVideo = require('./video/deleteSingleVideo');
const readVideo = require('./video/readVideo');
const updateVideo = require('./video/updateVideo');

// slide

const addSlide = require('./slides/addSlide');
const readSlide = require('./slides/readSlide');
const deleteMultipleSlide = require('./slides/deleteMultipleSlide');
const deleteSingleSlide = require('./slides/deleteSingleSlide');
const readSingleSlide = require('./slides/readSingleSlide');
const changeSlideStatus = require('./slides/changeSlideStatus');
const updateSlide = require('./slides/updateSlidee');

//  users

const registerUser = require('./user/registerUser');
const userDelete = require('./user/userdelete');
const fetchUser = require('./user/readUser');

const reqPayment = require('./payment/reqPayment');
const generateOtp = require('./otp/generateOTP');




module.exports = {
    
    // admin

    registerAdmin,
    adminLogin,

    // course

    addCourse,
    readCourse,
    changeStatus,
    readSingleCourse,
    updateCourse,
    deleteSingleCourse,
    deleteMultipleCourse,
    searchCourses,

    // team

    addTeam,
    readTeam,
    changeTrueStatus,
    readSingleTeam,
    updateTeam,
    deleteSingleTeam,
    deleteMultipleTeam,

    //video

    addVideo,
    readVideo,
    deleteSingleVideo,
    deleteMultipleVideo,
    updateVideo,
    changeVideoStatus,

    //Slide

    addSlide,
    readSlide,
    deleteMultipleSlide,
    deleteSingleSlide,
    readSingleSlide,
    changeSlideStatus,
    updateSlide,

    //user
   fetchUser,
    registerUser,
    userDelete,

    //otp

    generateOtp,

    // payment

    reqPayment,




    
}