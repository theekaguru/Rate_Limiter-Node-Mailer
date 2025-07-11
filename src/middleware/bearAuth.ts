import jwt from "jsonwebtoken"
import { NextFunction, Request , Response } from "express";
import dotenv from "dotenv"
import { error } from "console";

dotenv.config()

declare global{
    namespace Express{
        interface Request{
            user?: DecodedToken
        }
    }
}

type DecodedToken ={
    userId:number,
    email:string,
    userType:string,
    fullName: string,
    exp: number
}

//Authentication middleware

export const verifyToken = async(token:string ,secret:string) =>{
    try {
        const decoded = jwt.verify(token , secret) as DecodedToken
        return decoded;

    } catch (error) {
        return null;
        
    }

}

//Authorization middleware

export const authMiddleware = async (req: Request , res: Response , next:NextFunction ,requiredRoles:string) =>{
  const token = req.header('Authorization')
  if(!token){
    res.status(401).json({error:"Authorization header is missing"});
    return;
  }

  const decodedToken = await verifyToken(token , process.env.JWT_SECRET as string)
  
  if(!decodedToken){
    res.status(401).json({error:"Invalid or Expired token"})
  }
  const userType = decodedToken?.userType;



  //checks if both of you are admins or member
  if(requiredRoles === "both" && (userType === "admin" || userType === "member")){
    if(decodedToken?.userType === "admin" || decodedToken?.userType === "member"){
        req.user === decodedToken;
        next();
        return;
    }

    // checks either role of admin or member
  }else if(userType === requiredRoles){
    req.user === decodedToken;
    next();
    return;
  }else{
    res.status(403).json({error:"forbidden 🚫🚫:you do not have permission to access this resource"})
  }
}



//Middleware to check if the user is Admin
export const adminRoleAuth = async (req: Request , res: Response , next:NextFunction) => await authMiddleware(req , res , next , "admin")
export const memberRoleAuth = async (req: Request , res: Response , next:NextFunction) => await authMiddleware(req , res , next , "member")
export const bothRoleAuth = async (req: Request , res: Response , next:NextFunction) => await authMiddleware(req , res , next , "both")