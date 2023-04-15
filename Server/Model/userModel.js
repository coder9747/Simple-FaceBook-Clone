import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    friends:{
        type:Array,
        default:[]
    },
    friendsRequest:{
        type:Array,
        default:[]
    },
    notification:{
        type:[{type:String}],
        default:[]
    },
    description:{
        type:String,
        default:"Hey i am using facebook"
    }
})
const userModel = mongoose.model("user",userSchema);
export default userModel;