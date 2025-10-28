import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService, cartService } from '../../api';
import './Ecosis.css';

const Ecosystem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить товары: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);


  const ecosystems = [
    {
      id: 1,
      name: "🚀 Максимальная Производительность",
      price: 4500,
      description: "Для профессионалов, которым нужна максимальная мощность",
      devices: [
        { name: "MacBook Pro 16″ M3 Max", price: 3499, category: "mac" },
        { name: "iPhone 15 Pro Max 1TB", price: 1599, category: "iphone" },
        { name: "iPad Pro 12.9″ M2", price: 1299, category: "ipad" },
        { name: "Apple Watch Ultra 2", price: 799, category: "watch" },
        { name: "AirPods Max", price: 549, category: "airpods" }
      ],
      features: ["Профессиональная работа", "Творческие проекты", "Мобильность"],
      bestFor: ["Дизайнеры", "Разработчики", "Видеомейкеры"]
    },
    {
      id: 2,
      name: "💼 Бизнес и Учеба",
      price: 2500,
      description: "Идеальный набор для продуктивной работы и обучения",
      devices: [
        { name: "MacBook Air 15″ M2", price: 1299, category: "mac" },
        { name: "iPhone 15 Pro", price: 999, category: "iphone" },
        { name: "iPad Air M1", price: 749, category: "ipad" },
        { name: "Apple Watch Series 9", price: 399, category: "watch" },
        { name: "AirPods Pro (2nd gen)", price: 249, category: "airpods" }
      ],
      features: ["Учеба", "Работа", "Повседневное использование"],
      bestFor: ["Студенты", "Бизнесмены", "Фрилансеры"]
    },
    {
      id: 3,
      name: "🎮 Развлечения и Повседневность",
      price: 1500,
      description: "Отличный выбор для развлечений и повседневных задач",
      devices: [
        { name: "iPhone 15 Plus", price: 899, category: "iphone" },
        { name: "iPad 10th gen", price: 449, category: "ipad" },
        { name: "Apple Watch SE", price: 249, category: "watch" },
        { name: "AirPods (3rd gen)", price: 179, category: "airpods" },
        { name: "Apple TV 4K", price: 129, category: "accessories" }
      ],
      features: ["Развлечения", "Фитнес", "Умный дом"],
      bestFor: ["Семьи", "Студенты", "Фитнес-энтузиасты"]
    },
    {
      id: 4,
      name: "📱 Стартовый Набор",
      price: 800,
      description: "Отличное начало для знакомства с экосистемой Apple",
      devices: [
        { name: "iPhone 15", price: 799, category: "iphone" },
        { name: "Apple Watch SE", price: 249, category: "watch" },
        { name: "AirPods (3rd gen)", price: 179, category: "airpods" }
      ],
      features: ["Основные функции", "Доступность", "Простота использования"],
      bestFor: ["Новые пользователи", "Бюджетный вариант"]
    }
  ];


  const handleAddEcosystemToCart = (ecosystem) => {
    try {
      
      ecosystem.devices.forEach(device => {
        const demoProduct = {
          id: Date.now() + Math.random(),
          name: device.name,
          price: device.price,
          category: device.category,
          description: `Часть экосистемы: ${ecosystem.name}`,
          image: null
        };
        cartService.addToCart(demoProduct);
      });
      alert(`Экосистема "${ecosystem.name}" добавлена в корзину! 🎉`);
    } catch (error) {
      console.error('Error adding ecosystem to cart:', error);
      alert('Ошибка при добавлении в корзину');
    }
  };

  
  const formatPrice = (price) => {
    return `$${price}`;
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

  if (loading) {
    return (
      <div className="ecosystem-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          Загрузка экосистем...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ecosystem-page">
        <div className="error-message">
          <h3>Ошибка загрузки</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ecosystem-page">
      
      <section className="ecosystem-hero">
        <div className="container">
          <h1>Готовые Экосистемы Apple</h1>
          <p>Подобранные комплекты устройств для идеальной работы вместе</p>
        </div>
      </section>


      <section className="ecosystems-grid-section">
        <div className="container">
          <h2>Выберите готовую экосистему</h2>
          <p>Все устройства идеально совместимы и работают вместе</p>

          <div className="ecosystems-grid">
            {ecosystems.map(ecosystem => (
              <div key={ecosystem.id} className="ecosystem-card">
                <div className="ecosystem-header">
                  <h3>{ecosystem.name}</h3>
                  <div className="ecosystem-price">{formatPrice(ecosystem.price)}</div>
                </div>

                <p className="ecosystem-description">{ecosystem.description}</p>

                <div className="devices-list">
                  <h4>Устройства в комплекте:</h4>
                  {ecosystem.devices.map((device, index) => (
                    <div key={index} className="device-item">
                      <div className="device-info">
                        <span className="device-icon">{getCategoryIcon(device.category)}</span>
                        <span className="device-name">{device.name}</span>
                      </div>
                      <span className="device-price">{formatPrice(device.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="ecosystem-features">
                  <h4>Особенности:</h4>
                  <div className="features-list">
                    {ecosystem.features.map((feature, index) => (
                      <span key={index} className="feature-tag">✓ {feature}</span>
                    ))}
                  </div>
                </div>
                <div className="best-for">
                  <h4>Идеально для:</h4>
                  <div className="audience-list">
                    {ecosystem.bestFor.map((audience, index) => (
                      <span key={index} className="audience-tag">🎯 {audience}</span>
                    ))}
                  </div>
                </div>

                <div className="ecosystem-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddEcosystemToCart(ecosystem)}
                  >
                    🛒 Добавить весь набор в корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="ecosystem-cta">
        <div className="container">
          <h2>Не нашли подходящий вариант?</h2>
          <p>Соберите свою уникальную экосистему из доступных товаров</p>
          <div className="cta-actions">
            <Link to="/catalog" className="btn btn-primary">
              📱 Собрать свою экосистему
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ecosystem;