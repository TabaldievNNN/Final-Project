
const CART_STORAGE_KEY = 'appleStoreCart';

export const cartService = {

  getCart: () => {
    try {
      const cart = localStorage.getItem(CART_STORAGE_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error getting cart from storage:', error);
      return [];
    }
  },

  saveCart: (cart) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  },


  addToCart: (product) => {
    const cart = cartService.getCart();
    
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        quantity: 1,
        addedAt: new Date().toISOString()
      };
      cart.push(cartItem);
    }

    cartService.saveCart(cart);
    return cart;
  }
};