import express from "express"
import dotenv from "dotenv"
import conectdb from "./config/db.config.js"
import authrouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()

let app=express()
const port=process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use(express.json())
app.use(cookieParser())
app.use("/api",authrouter)//restapi concept!!
app.listen(port,()=>{
    conectdb()
    console.log("Server in running");
    
})