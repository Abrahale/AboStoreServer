import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { DbConnection } from "../services/database.service";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { User } from "../models/user";

export const authenticationRouter = express.Router();
authenticationRouter.use(express.json())

//BASIC AUTHENTICATION - Add JWT and properly implement it!
authenticationRouter.post('/',async (req:Request,res:Response) =>{
  try{
      const userDetails = req?.body as IAuthenticationModel;
      if(userDetails.email == null || userDetails.password == null )
        handleError(res,"Please, enter information to login");
      const result = await User.find({}).exec();
      if(result !== null){
        result.forEach(el =>{
          if(el.email === userDetails.email && el.password === userDetails.password){
            handleResponse(res,"Logged in successfully")
          }
        })
        handleError(res,'Either your email or password is incorrect!');
      }
  }
  catch(err){
    handleError(res,err);
  }
})
