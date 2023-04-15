import mongoose from "mongoose";

const dbConnect = async(req,res)=>
{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017",{
            dbName:"fbclone"
        })
        console.log("Connected To Database Succes");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;