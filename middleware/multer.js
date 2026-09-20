import multer from "multer";
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null,file.originalname)
    }
})
export const upload=multer({storage})