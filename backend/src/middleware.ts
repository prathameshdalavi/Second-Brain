import Jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const  JWT_SECRET_KEY="mysecretkey";

function userMiddleware(req:Request,res:Response,next: NextFunction) {
    const token=req.headers.token;
    if(typeof token==="string"){
    const decodedToken=Jwt.verify(token,JWT_SECRET_KEY);
    if(decodedToken){
        req.body.UserId=decodedToken;
        next();
    }
    else{
        res.status(401).json({
            message:"You are not Signed in",
            decodedToken
        })
    }
}
}
export {userMiddleware,JWT_SECRET_KEY}