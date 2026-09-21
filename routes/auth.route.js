import express from "express"
import { login, logout, signup, verify } from "../controllers/auth.controllers.js"
import { upload } from "../middleware/multer.js"
import authMiddleware from "../middleware/authMiddleware.js"
const authrouter=express.Router()
authrouter.post("/signup",upload.single("profileimage"),signup)
authrouter.post("/login",login)
authrouter.post("/logout",logout)
authrouter.get("/home",authMiddleware,verify)
export default authrouter