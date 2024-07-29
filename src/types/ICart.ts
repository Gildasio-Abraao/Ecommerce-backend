import { Document } from "mongoose";
import { ICartItem } from "./ICartItem";

export interface ICart extends Document {
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  coupon?: string;
  items?: ICartItem[];
}
