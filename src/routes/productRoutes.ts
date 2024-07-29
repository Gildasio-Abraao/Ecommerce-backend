import { Router } from 'express';
import ProductController from '../controllers/productController';

const router = Router();

router.get('/', ProductController.getProduct);

export default router;
