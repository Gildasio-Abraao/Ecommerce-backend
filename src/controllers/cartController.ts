import { Request, Response } from 'express';
import CartService from '../services/cartService';

class CartController {
  async getCart(req: Request, res: Response) {
    try {
      const cart = await CartService.getCart(req.params.id);

      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ message: 'Cart not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const cart = await CartService.addItem(req.params.id, req.body);

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const cart = await CartService.removeItem(req.params.id, req.params.itemId);

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateItemQuantity(req: Request, res: Response) {
    try {
      const cart = await CartService.updateItemQuantity(req.params.id, req.params.itemId, req.body.quantity);

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CartController();
