import { ICart } from "../types/ICart";
import mongoose, { Schema } from 'mongoose';

const CartItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

const CartSchema: Schema = new Schema({
  total: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  discount: { type: Number, required: true },
  shipping: { type: Number, required: true },
  coupon: { type: String },
  items: [CartItemSchema]
});

export default mongoose.model<ICart>('Cart', CartSchema);
