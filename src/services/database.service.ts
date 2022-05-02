import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import moongose from 'mongoose';
export const collections: { userCollection?: mongoDB.Collection } = {}
export class DbConnection{
  constructor(){this.init()}
  init = async () => {
    console.log('just for changes for deploys')
    await moongose.connect(process.env.DB_CONN_STRING, {
      dbName:process.env.DB_NAME
    },(err)=>{
      if(err){
        console.log(err);
      }
      else console.log(`========== DB connection to ${process.env.DB_NAME} established ===========`)
    })
  }
}
