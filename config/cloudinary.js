import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
//a file path will come and you need to save that!!
const uploadImageOnCloudinary=async (filePath)=>{
    try {
        if(!filePath){
            return null;
        }
        let result=await cloudinary.uploader.upload(filePath)
        console.log(result);
        fs.unlinkSync(filePath)
        return result.secure_url

    } catch (error) {
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }
        console.log(error);
        return null;
    }
    
}
export default uploadImageOnCloudinary