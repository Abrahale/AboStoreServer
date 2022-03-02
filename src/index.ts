import express  from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { usersRouter } from "./routes/users.router";
import cors from 'cors';
dotenv.config();
import { DbConnection } from './services/database.service';
import { authenticationRouter } from './routes/authentication';
import { productsRouter } from './routes/products';
import { seedDatabaseRouter} from './routes/seed-database';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const FE_URL = ['http://localhost:4200'];
const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      origin: FE_URL
};
app.use(cors());
app.use("/users", usersRouter);
app.use("/login", authenticationRouter);
app.use("/products", productsRouter);
app.use("/seed-db", seedDatabaseRouter);
new DbConnection();
app.listen(PORT, () => {
    console.log(`Server started and listening at http://localhost:${PORT}`);
});
