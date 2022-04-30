import express, { Request, Response } from "express";
import { handleResponse } from "../middleware/response.middeware";
import { IProduct, Product } from "../models/product";
import { ProductCategory, IProductCategory } from "../models/product-category";
import { response } from "../models/response";
import category from './../json-files/category.json';
import faker from "@faker-js/faker";
import { ObjectId } from "mongodb";
// Global Config
export const seedDatabaseRouter = express.Router();
seedDatabaseRouter.use(express.json());
// GET

seedDatabaseRouter.get("/category",async (_req: Request, res: Response) => {
    const result  = await seedCategory()
    handleResponse(res,result)
});
seedDatabaseRouter.get("/products",async (_req: Request, res: Response) => {
    const result  = await seedProduct()
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

const seedProduct = async() => {
  const cat= await ProductCategory.find({}).exec() as IProductCategory[];
  console.log(cat)
  //return cat;
    const product = {
      productCode: faker.finance.account(),
      title: faker.commerce.productName(),
      imagePath: faker.image.fashion(),
      sku: faker.datatype.string(),
      category: cat[0].id,
      manufacturer: faker.company.companyName(),
      available: faker.datatype.boolean(),
      price: parseInt(faker.commerce.price()),
      description: faker.commerce.productDescription(),
    } as IProduct 
    try{
      await Product.insertMany(product);
      return "Categories added"
    }
    catch(error){
      return `${error} Failed to add Categories `
    }
}

