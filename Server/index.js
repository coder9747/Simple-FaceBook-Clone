import express from "express";

const app = express();








app.get("/",(req,res)=>
{
    res.send("response ok");
})














app.listen(4500,()=>{
    console.log("Server Listining To port 4500")
})