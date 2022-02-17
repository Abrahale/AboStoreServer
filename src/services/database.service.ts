// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
export const collections: { userCollection?: mongoDB.Collection } = {}
// Initialize Connection
export class DbConnection{
  static db: mongoDB.Db
  constructor(){
    this.init();}
  init = async () => {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || "");

    await client.connect();

    DbConnection.db = client.db(process.env.DB_NAME);

 }
 static getDbCollection = async() =>{
  const collection = await  DbConnection.db.collection(process.env.USERS_COLLECTION_NAME);
  return collection;
  }
}
