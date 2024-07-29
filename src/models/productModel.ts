import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/IProduct';

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  offer: { type: Number },
  stockQuantity: { type: Number, required: true },
  rate: { type: Number },
  image: { type: String, required: true },
  description: { type: String }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
