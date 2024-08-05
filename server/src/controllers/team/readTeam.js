const Team = require("../../models/team/team");

const readTeam = async (req,res)=>{

    try{
        const response = await Team.find();
         const filePath = `${req.protocol}://${req.get('host')}/uploads/`;

        res.status(200).json({message:'data fetch sucessfully', data:response, filePath});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }

};

module.exports = readTeam;