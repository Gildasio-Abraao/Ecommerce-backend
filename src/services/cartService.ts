import Cart from '../models/cartModel';
import Product from '../models/productModel';

class CartService {
  async getCart(id: string) {
    return Cart.findById(id).populate('items.productId').exec();
  }

  async addItem(cartId: string, item: any) {
    const product = await Product.findById(item.productId).exec();

    if(!product) throw new Error('Product not found');

    const cart = await Cart.findById(cartId).exec();

    if(cart) {
      const existingItem = cart.items.find(i => i.productId.equals(item.productId));
      
      if(existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.items.push(item);
      }

      cart.subtotal += product.price * item.quantity;
      cart.total = cart.subtotal - cart.discount + cart.shipping;

      return cart.save();
    }

    throw new Error('Cart not found');
  }

  async removeItem(cartId: string, productId: string) {
    const cart = await Cart.findById(cartId).exec();

    if(cart) {      
      const itemIndex = cart.items.findIndex(i => i.productId._id.equals(productId));

      if(itemIndex > -1) {
        const [removedItem] = cart.items.splice(itemIndex, 1);
        const product = await Product.findById(productId).exec();

        if(product) {
          cart.subtotal -= product.price * removedItem.quantity;
          cart.total = cart.subtotal - cart.discount + cart.shipping;
          return cart.save();
        }
      }

      throw new Error('Item not found');
    }

    throw new Error('Cart not found');
  }

  async updateItemQuantity(cartId: string, productId: string, quantity: number) {
    const cart = await Cart.findById(cartId).exec();

    if(cart) {
      const item = cart.items.find(i => i.productId._id.equals(productId));

      if(item) {
        const product = await Product.findById(productId).exec();

        if(product) {
          cart.subtotal -= product.price * item.quantity;
          item.quantity = quantity;
          cart.subtotal += product.price * item.quantity;
          cart.total = cart.subtotal - cart.discount + cart.shipping;

          return cart.save();
        }
      }

      throw new Error('Item not found');
    }

    throw new Error('Cart not found');
  }
}

export default new CartService();
