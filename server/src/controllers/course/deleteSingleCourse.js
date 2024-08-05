const Course = require("../../models/course/course");

const deleteSingleCourse = async(req, res)=>{
    try{
        const response = await Course.findByIdAndDelete(req.params);

        if(!response) return res.status(404).json({message: 'please provoide a valid course id'});

        res.status(200).json({message: 'course deleted successfully', data : response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = deleteSingleCourse;