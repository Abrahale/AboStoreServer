import { ObjectId } from "mongodb";

interface IProductInventory {
  id: ObjectId,
  quantity: number,
  description: string,
  createdDate: string,
  modifiedDate: string,
  deletedDate: string,
}
