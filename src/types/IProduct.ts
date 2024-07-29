export interface IProduct extends Document {
  name: string;
  price: number;
  offer?: number;
  stockQuantity: number;
  rate?: number;
  image: string;
  description?: string;
}
