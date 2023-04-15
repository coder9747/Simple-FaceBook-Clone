import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    description:{
        type:String,
    },
    image:{
        type:String, 
    },
    likes:{
        type:Array,
        default:[],
    },
    dislike:{
        type:Array,
        default:[]
    }
})

const postModel = mongoose.model("post",postSchema);
export default postModel;