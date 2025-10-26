const mongoose = require('../configurations/mongoose_config');

const LikeSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'UserSchema',
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PostSchema',
        required:true,
    }
} , {timestamps:true})

module.exports = mongoose.model('LikeSchema' , LikeSchema);