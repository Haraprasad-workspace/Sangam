const mongoose = require('../configurations/mongoose_config');

const UserSchema = mongoose.Schema({
    providerid : {
        type:String,
        default:null
    },
    email:{
        type:String,
        required:true,
        unique:true,
    } ,
    password:{
        type:String,
        default:null

    },
    name:{
        type:String,
        default:"Anonymous"
    },
    username:{
        type:String,
        default:"Anonymous"
    },
    avatarurl:{
        type:String,
        default:"https://www.svgrepo.com/show/153727/profile-avatar.svg"
    },
}, {timestamps:true})

module.exports = mongoose.model('UserSchema' , UserSchema);