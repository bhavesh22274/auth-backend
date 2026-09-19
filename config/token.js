//to generate token
import jwt from "jsonwebtoken"
//user_id,secret_key,token_expiry
const generateToken= (id)=>{
    let token=jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
}
export default generateToken