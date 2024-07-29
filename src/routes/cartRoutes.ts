import { Router } from 'express';
import CartController from '../controllers/cartController';

const router = Router();

router.get('/:id', CartController.getCart);
router.post('/:id/add', CartController.addItem);
router.delete('/:id/remove/:itemId', CartController.removeItem);
router.put('/:id/update/:itemId', CartController.updateItemQuantity);

export default router;
