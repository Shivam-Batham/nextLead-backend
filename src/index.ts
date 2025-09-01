import express from "express";
import dotenv from "dotenv";

dotenv.config({path:"./.env"});
const app = express();



app.get("/",(req,res)=>{
    return  res.send("Server health is 100% correct.")
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`)
})