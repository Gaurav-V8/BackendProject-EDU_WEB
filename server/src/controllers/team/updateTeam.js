const Team = require("../../models/team/team");
const fs = require('fs');
const path = require('path');

const updateTeam = async(req,res)=>{

    try{
        const data = req.body;
        if(req.file){
            data.thumbnail = req.file.filename;

            const {thumbnail} = await Team.findOne(req.params);

            if(thumbnail){
            const oldfilepath = path.join('src', 'uploads', thumbnail);
            if(fs.existsSync(oldfilepath)){
                fs.unlinkSync(oldfilepath);
            }
        }

            
        };

        const response = await Team.findOneAndUpdate(
            req.params,
            {
                $set: data
            }
        );
       

    res.status(200).json({message: 'data updated successfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error '});
    }

};

module.exports = updateTeam;