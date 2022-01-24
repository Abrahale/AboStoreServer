// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {IUser, User} from "../models/user";
import { collections } from "../services/database.service";
// Global Config
export const usersRouter = express.Router();

usersRouter.use(express.json());
// GET
usersRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const users = (await collections.userCollection.find({}).toArray()) as unknown as User[];

        res.status(200).send(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const result = (await collections.userCollection.findOne(query)) as unknown as User;

        if (result) {
            console.log(result)
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
// POST
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newUser = req.body as IUser;
        console.log(newUser)
        const result = await collections.userCollection.insertOne(newUser);

        result
            ? res.status(200).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
// PUT
usersRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedUser: IUser = req.body as IUser;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.userCollection.updateOne(query, { $set: updatedUser });
        console.log(result)
        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
// DELETE
usersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.userCollection.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`User with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});