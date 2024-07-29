import Product from '../models/productModel';

class ProductService {
  async getAllProducts(page: number = 1, limit: number = 4) {
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit).exec();
    const total = await Product.countDocuments().exec();

    return {
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  async searchProducts(query: string, page: number = 1, limit: number = 4) {
    const skip = (page - 1) * limit;
    const regex = new RegExp(query, 'i');
    const filter = { $or: [{ name: regex }, { description: regex }] };

    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(limit).exec(),
      Product.countDocuments(filter).exec()
    ]);

    return {
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }
}

export default new ProductService();
