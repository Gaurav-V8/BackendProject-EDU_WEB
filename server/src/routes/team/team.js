const express = require('express');

const{addTeam,
     readTeam, 
     changeTrueStatus,
     readSingleTeam,
     updateTeam
    } = require('../../controllers/controllers');
const teamMulter = require('../../middelwares/team/teamMulter');
const deleteSingleTeam = require('../../controllers/team/deleteSingleTeam');
const deleteMultipleTeam = require('../../controllers/team/deleteMultipleTeam');




const teamRoutes = express.Router();

teamRoutes.post('/add_team',teamMulter,addTeam);
teamRoutes.get('/read_teams', readTeam);
teamRoutes.put('/change_team_status',changeTrueStatus);
teamRoutes.get('/fetch_team_id/:_id', readSingleTeam);
teamRoutes.put('/update_team/:_id',teamMulter,updateTeam);
teamRoutes.delete('/delete_single_team/:_id', deleteSingleTeam);
teamRoutes.delete('/multi_delete',deleteMultipleTeam);

module.exports = teamRoutes;