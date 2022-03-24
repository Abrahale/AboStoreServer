import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import moongose from 'mongoose';
export const collections: { userCollection?: mongoDB.Collection } = {}
export class DbConnection{
  constructor(){this.init()}
  init = async () => {
    dotenv.config();
    console.log("this is the db connection string "+process.env.DB_CONN_STRING || "mongodb://localhost:27017")
    await moongose.connect(process.env.DB_CONN_STRING || "mongodb://127.0.0.1:27017", {
      dbName:process.env.DB_NAME
    },(err)=>{
      if(err){
        console.log(err);
      }
      else console.log("========== DB connection established ===========")
    })
 }

}
