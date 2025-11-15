import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService, cartService } from '../../api';
import './Productdet.css';

const ProductDet = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productService.getAllProducts();
        const item = data.find(p => p.id === id);
        setProduct(item);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const addToCart = () => {
    if (product) {
      cartService.addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) return (
    <div className="loading-screen">
      <div className="loader"></div>
      <p>Загружаем товар...</p>
    </div>
  );

  if (!product) return (
    <div className="error-screen">
      <div className="error-icon">😕</div>
      <h2>Товар не найден</h2>
      <p>Попробуйте выбрать другой товар из каталога</p>
    </div>
  );

  return (
    <div className="product-page">
      <div className="product-container">



        <div className="product-gallery">
          <div className="main-image">
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="image-placeholder">
                <span className="placeholder-emoji">📱</span>
              </div>
            )}
          </div>
        </div>






        <div className="product-info">
          <div className="category-badge">{product.category}</div>
          
          <h1 className="product-title">{product.name}</h1>
          
          <div className="price-section">
            <span className="price">${product.price}</span>
            <div className="rating">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="rating-text">4.8 (128 отзывов)</span>
            </div>
          </div>

          <p className="description">
            {product.description || 'Премиум устройство Apple с передовыми технологиями и стильным дизайном.'}
          </p>

          <div className="features">
            <div className="feature">
              <span className="feature-icon">🚚</span>
              Бесплатная доставка
            </div>
            <div className="feature">
              <span className="feature-icon">🔄</span>
              Возврат за 14 дней
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              Официальная гарантия
            </div>
          </div>

          <button 
            onClick={addToCart}
            className={`add-btn ${added ? 'added' : ''}`}
          >
            {added ? '✅ Добавлено!' : '🛒 Добавить в корзину'}
          </button>

          <div className="specs">
            <h3>Характеристики</h3>
            <div className="specs-grid">
              <div className="spec">
                <span>Категория</span>
                <span>{product.category}</span>
              </div>
              <div className="spec">
                <span>В наличии</span>
                <span className="in-stock">✅ Есть</span>
              </div>
              <div className="spec">
                <span>Доставка</span>
                <span>1-2 дня</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDet;