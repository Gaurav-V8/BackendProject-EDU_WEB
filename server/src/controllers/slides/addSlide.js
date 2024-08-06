const Slide = require("../../models/slides/slide");


const addSlide = async(req,res)=>{
    try{
        const slideData = req.body;

        if(req.file){
        slideData.thumbnail = req.file.filename;
    }

        console.log(slideData);

        const data = new Slide(slideData);

        const response = await data.save();
        res.status(200).json({message: 'Slide added successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
};

module.exports = addSlide;