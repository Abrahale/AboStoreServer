import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IProduct {
  id: ObjectId,
  productCode:string,
  title: string,
  imagePath:string,
  sku: string,
  category: {},
  manufacturer: string,
  available:{},
  inventory_id: ObjectId,
  price: number,
  discount_id: ObjectId,
  description: string,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const productSchema = new Schema<IProduct>({
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  manufacturer: {
    type: String,
  },
  available: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
  deletedDate: {
    type: Date,
  },
});

export const Product = mongoose.model<IProduct>('Product',productSchema);
