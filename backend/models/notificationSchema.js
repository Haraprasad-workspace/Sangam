const mongoose = require('../configurations/mongoose_config');

const NotificationSchema = mongoose.Schema({
    receipt :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserSchema',
        required:true,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserSchema',
        required:true,
    },
    post : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'PostSchema',

    },
    type:{
        type:String,
        required:true,
        enum:['like' ,'follow' , 'unfollow']
    },
    isRead:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

module.exports = mongoose.model('NotificationSchema' , NotificationSchema);