import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { DbConnection } from "../services/database.service";


export const authenticationRouter = express.Router();
authenticationRouter.use(express.json())

//BASIC AUTHENTICATION - Add JWT and properly implement it!
authenticationRouter.post('/',async (req:Request,res:Response) =>{
  try{
      const userDetails = req?.body as IAuthenticationModel;
      if(userDetails.email == null || userDetails.password == null )
        res.send("Please, enter information to login");
      const result = await (await DbConnection.getDbCollection(process.env.USERS_COLLECTION_NAME)).find({}).toArray();
      if(result !== null){
        result.forEach(el =>{
          if(el.email === userDetails.email && el.password === userDetails.password){
            res.status(200).send({"result":"Logged in successfully"})
          }
        })
        res.status(401).send({'result':'Either your email or password is incorrect!'});
      }
  }
  catch(err){}
})
