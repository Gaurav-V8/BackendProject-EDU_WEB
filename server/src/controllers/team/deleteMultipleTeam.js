const Team = require('../../models/team/team');

const fs = require('fs');
const path = require('path');

const deleteMultipleTeam = async(req, res)=>{
    try{
        const oldData = await Team.find({_id:{$in: req.body}});
        
        oldData.forEach((item)=>{
            if(item.thumbnail){
                const oldfilepath = path.join('src', 'uploads', item.thumbnail);
                if(fs.existsSync(oldfilepath)){
                    fs.unlinkSync(oldfilepath);
                }
            }
        });

        const response = await Team.deleteMany({_id:{$in: req.body}});

        res.status(200).json({messsage: 'data deleted successfully', data: response});
    }
    catch(error){
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = deleteMultipleTeam;