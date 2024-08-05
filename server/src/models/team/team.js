const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamname:String,
    teamcategory:String,
    thumbnail:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date
    }

});

const Team = mongoose.model('teams', teamSchema);

module.exports = Team;