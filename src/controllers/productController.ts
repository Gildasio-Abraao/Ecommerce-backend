import { Request, Response } from 'express';
import ProductService from '../services/productService';

class ProductController {
  async getProduct(req: Request, res: Response) {
    const query = req.query.query as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;

    try {
      if(query) {
        const result = await ProductService.searchProducts(query, page, limit);
        res.json(result);
      } else {
        const result = await ProductService.getAllProducts(page, limit);
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new ProductController();
