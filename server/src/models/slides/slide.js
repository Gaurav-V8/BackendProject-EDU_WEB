
const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
    slideheading:String,
    slideSubheading:String,
    slidedes:String,
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

const Slide = mongoose.model('slides', slideSchema);

module.exports = Slide;