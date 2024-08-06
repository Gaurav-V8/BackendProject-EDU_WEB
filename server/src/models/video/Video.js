const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoname:String,
    videotopic:String,
    videourl:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,  
    }
});
const Video = mongoose.model('videos',videoSchema);

module.exports = Video;


