import mongoose from "mongoose";
const conectdb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected");
        
    } catch (error) {
        console.log("DB error",error);
        
    }
}
export default conectdb