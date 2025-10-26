const mongoose = require('../configurations/mongoose_config');

const FollowSchema = mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserSchema',
        required:true,
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserSchema',
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model('FollowSchema' , FollowSchema);