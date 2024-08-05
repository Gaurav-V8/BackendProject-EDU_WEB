const adminLogin = require('./admin/adminLogin');
const registerAdmin = require('./admin/resgisterAdmin');

// add course
const addCourse = require('./course/addCourse');
const changeStatus = require('./course/changeStatus');
const deleteSingleCourse = require('./course/deleteSingleCourse');
const readCourse = require('./course/readCourse');
const readSingleCourse = require('./course/readSingleCourse');
const trueCourses = require('./course/trueCourses');
const updateCourse = require('./course/updateCourse');

// add team
const addTeam = require('./team/addteam');
const changeTrueStatus = require('./team/changeTrueStatus');
const readSingleTeam = require('./team/readSingleteam');
const readTeam = require('./team/readTeam');
const updateTeam = require('./team/updateTeam');




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
    trueCourses,

    // team

    addTeam,
    readTeam,
    changeTrueStatus,
    readSingleTeam,
    updateTeam,
}