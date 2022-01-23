// const express = require('express');
// import  dotenv from 'dotenv';
// dotenv.config();
// import 'joi-objectid/joi';
import express, {Express, Request, Response}  from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();
//import {MongoClient} from 'mongodb'
// import dotenv from 'dotenv'
// const dotenv = require('dotenv');
// const { get } = require('express/lib/request');
// dotenv.config();
// const Joi = require('joi')
// Joi.objectId = require('joi-objectid')(Joi);
//import Mongoose from 'mongoose';
// const mongoose = require('mongoose');
//import {User, validateUser}  from './models/user.model';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//  const listDatabases = async (client) => {
//     const databaseList = await client.db().admin().listDatabases();
//     console.log("Databases: ");
//     databaseList.databases.forEach(db => {
//         console.log(` -${db.name}`)
//     });
// }

// const main = async ()=>{
//     const mdb_client = new MongoClient(process.env.MONGODB_URL);
//     try{
//     await mdb_client.connect();
//     await listDatabases(mdb_client);
//     await addUser(mdb_client,{name:"John",age:"15",status:"A","will this work":"yes"})
//     await getUser(mdb_client,"John")
//     }
//     catch(e){
//         console.error(e);
//     }
//     finally{
//         await mdb_client.close();
//     }
// }
// main().catch(console.error);
app.get('/', (req:Request, res:Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({"name": "Abrahale", "age":"27","grade":"28"});
});

//app.use(express.json());
// app.use('/api/users', User);

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT} ⚡`);
});

// const addUser = async (client, user) => {
//     const result = await client.db("AboStore").collection("users").insertOne(user);
//     console.log(`New user added with the follwoing ID: ${result.insertedId}`);
// }

// const getUser = async (client, userName) => {
//    const restult = await client.db("AboStore").collection("users").findOne({name: userName});

//    if(restult)
//        console.log(restult)
//    else
//    console.error(`${userName} does not exist in the database`)
// }





