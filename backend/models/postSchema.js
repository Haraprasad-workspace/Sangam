const mongoose = require('../configurations/mongoose_config');

const PostSchema = mongoose.Schema({
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'UserSchema' ,
        required:true,
    },
    content:{
        type:String,
        required:true,
        minlength:1,
        maxlength:500
    },
    emotion: {
        type: String,
        enum: ["sadness","joy","love","anger","fear","surprise"],
        default:"neutral"
    },

    // NEW FIELD: prediction confidence
    confidence: {
        type: Number,
        default:0
    }
} , {timestamps:true})

module.exports = mongoose.model('PostSchema' , PostSchema);