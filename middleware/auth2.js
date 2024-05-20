import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
export const verifyUser = (req,res,next) =>{
const token = req.cookies.token

if(!token){
    return res.json({Error: 'you are not allowed'});

}else[
    jwt.verify(token, process.env.SECRET_STRING, (err,decoded) => {
        if(err){
            return res.json({Error: 'token bad'});
        }
        else{
            req.id = decoded.id;
            req.username = decoded.username;
            req.branch = decoded.branch;
            req.type = decoded.type;
            next();
        }
    })
]
}