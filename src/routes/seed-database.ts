import express, { Request, Response } from "express";
import { handleResponse } from "../middleware/response.middeware";
import { ProductCategory } from "../models/product-category";
import { response } from "../models/response";
import category from './../json-files/category.json';
// Global Config
export const seedDatabaseRouter = express.Router();
seedDatabaseRouter.use(express.json());
// GET

seedDatabaseRouter.get("/category",async (_req: Request, res: Response) => {
    const result  = await seedCategory()
    handleResponse(res,result)
});

const seedCategory = async () =>{
  try{
    await ProductCategory.insertMany(category);
    return "Categories added"
  }
  catch{
    return "Failed to add Categories "
  }

}

