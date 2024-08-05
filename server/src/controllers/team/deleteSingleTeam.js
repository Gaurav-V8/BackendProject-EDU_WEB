const Team = require("../../models/team/team");



const deleteSingleTeam = async(req, res)=>{
    try{
        const response = await Team.findByIdAndDelete(req.params);

        if(!response) return res.status(404).json({message: 'please provoide a valid team id'});

        res.status(200).json({message: 'team deleted successfully', data : response})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = deleteSingleTeam;