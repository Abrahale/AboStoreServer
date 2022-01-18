const express = require('express'); 
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
const { get } = require('express/lib/request');
dotenv.config();
const app = express();              
const port = process.env.PORT; 

async function listDatabases(client){
    databaseList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databaseList.databases.forEach(db => {
        console.log(` -${db.name}`)
    });
}

async function main(){    
    const mdb_client = new MongoClient(process.env.MONGODB_URL);
    try{
    await mdb_client.connect();
    await listDatabases(mdb_client);
    await addUser(mdb_client,{name:"John",age:"15",status:"A","will this work":"yes"})
    await getUser(mdb_client,"John")
    }
    catch(e){
        console.error(e);
    }
    finally{
        await mdb_client.close();
    }
}
main().catch(console.error);
app.get('/', (req, res) => {        
    res.header("Access-Control-Allow-Origin", "*");
    res.json({"name": "Abrahale", "age":"27","grade":"28"});
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

async function addUser(client, user){
    const result = await client.db("AboStore").collection("users").insertOne(user);
    console.log(`New user added with the follwoing ID: ${result.insertedId}`);
}

async function getUser(client, userName){
   const restult = await client.db("AboStore").collection("users").findOne({name: userName});

   if(restult)
       console.log(restult)   
   else
   console.error(`${userName} does not exist in the database`)
}
