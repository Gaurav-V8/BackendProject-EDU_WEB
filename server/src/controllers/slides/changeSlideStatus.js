const Slide = require("../../models/slides/slide");


const changeSlideStatus = async(req,res) =>{
    try{
        const response = await Slide.updateOne(
            {
                _id: req.body.id
            },
            {
                $set: {
                    status: req.body.status,
                    updated_at: Date.now()
                }
            }
        );
        res.status(200).json({message: 'status updated successfully', data: response});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = changeSlideStatus;

