import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartService } from '../../api';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  
  useEffect(() => {
    const savedCart = cartService.getCart();
    console.log('📦 Cart loaded on mount:', savedCart);
    setCartItems(savedCart);
  }, []);

  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  
  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  
  const clearCart = () => {
    setCartItems([]);
  };


  const addSampleItem = () => {
    const sampleItem = {
      id: Date.now(),
      name: "iPhone 15 Pro",
      price: 1299,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=webp",
      category: "iphone",
      quantity: 1
    };
    setCartItems([...cartItems, sampleItem]);
  };


  useEffect(() => {
    console.log('💾 Saving cart to localStorage:', cartItems);
    cartService.saveCart(cartItems);
  }, [cartItems]);


  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Заказ успешно оформлен! Спасибо за покупку! 🎉');
      setCartItems([]);
      setIsCheckingOut(false);
    }, 2000);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      iphone: '📱',
      mac: '💻',
      ipad: '📱',
      watch: '⌚',
      airpods: '🎧',
      accessories: '🔧'
    };
    return icons[category] || '📦';
  };

  return (
    <div className="cart-page">
      <section className="cart-header">
        <div className="container">
          <h1 className="cart-title">Корзина покупок</h1>
          <p className="cart-subtitle">Товаров в корзине: {cartItems.length}</p>
        </div>
      </section>

      <div className="cart-content">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Ваша корзина пуста</h2>
              <p>Добавьте товары из каталога, чтобы сделать заказ</p>
              <div className="empty-cart-actions">
                <Link to="/catalog" className="btn btn-primary">
                  📱 Перейти в каталог
                </Link>
                <button onClick={addSampleItem} className="btn btn-secondary">
                  🎁 Добавить демо-товар
                </button>
              </div>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items-section">
                <div className="cart-items-header">
                  <h2>Товары в корзине ({cartItems.length})</h2>
                  <button onClick={clearCart} className="btn btn-outline clear-cart-btn">
                    🗑️ Очистить корзину
                  </button>
                </div>

                <div className="cart-items-list">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="item-icon">
                            {getCategoryIcon(item.category)}
                          </div>
                        )}
                      </div>

                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <div className="item-category">{item.category}</div>
                        <div className="item-price">${item.price}</div>
                      </div>

                      <div className="item-controls">
                        <div className="quantity-controls">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="quantity-btn"
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>

                        <div className="item-total">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="remove-btn"
                          title="Удалить товар"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="cart-summary">
                <div className="summary-card">
                  <h3>Итоги заказа</h3>
                  
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Подытог:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Доставка:</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Налог (10%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                      <span>Итого:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="checkout-actions">
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className={`btn btn-primary checkout-btn ${isCheckingOut ? 'loading' : ''}`}
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="spinner"></div>
                          Оформление...
                        </>
                      ) : (
                        '💳 Перейти к оплате'
                      )}
                    </button>
                    
                    <Link to="/catalog" className="btn btn-outline continue-shopping">
                      ← Продолжить покупки
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;