import express from 'express';
import mongoose from 'mongoose';
import cartRoutes from './routes/cartRoutes';
import productRoutes from './routes/productRoutes';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DB_URL;
const MONGO_USER = process.env.DB_USER;
const MONGO_PASS = process.env.DB_PASSWORD;

mongoose.connect(MONGO_URI, { appName: 'Ecommerce', auth: { username: MONGO_USER, password: MONGO_PASS } })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
