const Course = require("../../models/course/course");

const addCourse = async(req,res)=>{
    try{
        const courseData = req.body;

        if(req.file){
        courseData.thumbnail = req.file.filename;
    }

        console.log(courseData);

        const data = new Course(courseData);

        const response = await data.save();
        res.status(200).json({message: 'course added successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
};

module.exports = addCourse;