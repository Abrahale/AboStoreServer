import mongoose, { ObjectId, Schema } from "mongoose";

export interface IProductCategory {
  id: ObjectId,
  name: string,
  description: string,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const categorySchema =new Schema<IProductCategory>({
    name:{
      type: String,
      required: true,
    },
    description:{
      type: String,
    },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    deletedDate: { type: Date },
})

export const ProductCategory = mongoose.model<IProductCategory>("Category", categorySchema);



