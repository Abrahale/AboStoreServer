import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { IProductCategory, ProductCategory } from "../models/product-category";
export const categoryRouter = express.Router();
categoryRouter.use(express.json());
// GET
categoryRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const category = await ProductCategory.find({}).exec();
    handleResponse(res,category)
  } catch (error: any) {
      handleError(res,error)
  }
});

categoryRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
      const query = { _id: id };
      const result =  await ProductCategory.findById(query).exec();
      if (result) {
        handleResponse(res,result)
      }
  } catch (error) {
    handleError(res,`Unable to find matching document with id: ${req.query.id}`)
  }
});
// POST
categoryRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newCategoryProduct = req.body as IProductCategory;
    const category = new ProductCategory(newCategoryProduct);
    const result = await category.save();
     handleResponse(res,`Successfully created a new category with id ${result._id}`)
} catch (error) {
  handleError(res,`Failed to create a new category. Error: ${error}`);
}
});