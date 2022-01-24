import express, {Express, Request, Response}  from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { usersRouter } from "./routes/users.router";

dotenv.config();
import Mongoose from 'mongoose';
import { connectToDatabase } from './services/database.service';
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URL;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

connectToDatabase()
    .then(() => {
        app.use("/users", usersRouter);

        app.listen(PORT, () => {
            console.log(`Server started and listening at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });





