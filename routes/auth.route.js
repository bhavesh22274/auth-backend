import express from "express"
import { login, logout, signup } from "../controllers/auth.controllers.js"
import { upload } from "../middleware/multer.js"
const authrouter=express.Router()
authrouter.post("/signup",upload.single("profileimage"),signup)
authrouter.post("/login",login)
authrouter.post("/logout",logout)
export default authrouter