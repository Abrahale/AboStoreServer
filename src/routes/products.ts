import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {IUser, User} from "../models/user";
import { DbConnection } from "../services/database.service";
import * as dontenv from "dotenv";
export const productsRouter = express.Router();
productsRouter.use(express.json());
// GET
productsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const collection = (await DbConnection.getDbCollection(process.env.PRODUCTS_COLLECTION_NAME));
        const users = await collection.find({}).toArray();
        res.status(200).send({users});
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id) };
        const result =  (await DbConnection.getDbCollection(process.env.PRODUCTS_COLLECTION_NAME)).findOne(query) as unknown as any[];
        if (result) {
            res.status(200).send({result});
        }
    } catch (error) {
        res.status(404).send({'error':`Unable to find matching document with id: ${req.params.id}`});
    }
});
// POST
productsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newProduct = req.body as IProduct;
        const result =  await (await DbConnection.getDbCollection(process.env.PRODUCTS_COLLECTION_NAME)).insertOne(newProduct);
        result
            ? res.status(200).send({"status":true,'result':`Successfully created a new user with id ${result.insertedId}`})
            : res.status(500).send({"status":false,'result':"Failed to create a new user."});
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// PUT
// productsRouter.put("/:id", async (req: Request, res: Response) => {
//     const id = req?.params?.id;

//     try {
//         const updatedUser: IUser = req.body as IUser;
//         const query = { _id: new ObjectId(id) };

//         const result = await collections.userCollection.updateOne(query, { $set: updatedUser });
//         result
//             ? res.status(200).send(`Successfully updated user with id ${id}`)
//             : res.status(304).send(`User with id: ${id} not updated`);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });
// DELETE
// productsRouter.delete("/:id", async (req: Request, res: Response) => {
//     const id = req?.params?.id;

//     try {
//         const query = { _id: new ObjectId(id) };
//         const result = await collections.userCollection.deleteOne(query);

//         if (result && result.deletedCount) {
//             res.status(202).send(`Successfully removed user with id ${id}`);
//         } else if (!result) {
//             res.status(400).send(`Failed to remove user with id ${id}`);
//         } else if (!result.deletedCount) {
//             res.status(404).send(`User with id ${id} does not exist`);
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });
