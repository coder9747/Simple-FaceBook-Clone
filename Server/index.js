import express from "express";
import dbConnect from "./Database/dbConnect.js";
import cors from "cors";
import dotenv from "dotenv"
import userRouter from "./Router/userRouter.js";
import postRouter from "./Router/postRouter.js";
import bodyParser from "body-parser";

const app = express();


//middleware
app.use(express.json());
app.use(cors());

dotenv.config();


//public routes
app.use("/user",userRouter);
app.use("/post",postRouter);



app.listen(4500,()=>{
    console.log("Server Listining To port 4500")
    dbConnect();
})