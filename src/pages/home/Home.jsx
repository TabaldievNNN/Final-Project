import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../api';
import './Home.css';

const Home = () => {
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

  const popularProducts = products.slice(0, 6);
  const newArrivals = products.slice(6, 12);
  const bestSellers = products.slice(12, 18);

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

  const appleEcosystems = [
    {
      name: "Базовый стартовый набор",
      price: "2000$",
      devices: ["iPhone 15", "AirPods Pro (2nd gen)", "Apple Watch Series 9", "MagSafe Charger"],
      description: "Идеальное начало для погружения в экосистему Apple",
      features: ["Синхронизация между устройствами", "Общий буфер обмена", "Автоматическое подключение"]
    },
    {
      name: "Профессиональный рабочий комплект", 
      price: "5000$",
      devices: ["MacBook Pro 16″ M3 Pro", "iPhone 15 Pro Max", "iPad Pro 12.9″", "AirPods Max", "Apple Pencil"],
      description: "Максимальная производительность для работы и творчества",
      features: ["Универсальный контроль", "Продолжение работы между устройствами", "Общие уведомления"]
    },
    {
      name: "Полная экосистема премиум",
      price: "8000$", 
      devices: ["Mac Studio", "iPhone 15 Pro", "iPad Air", "Apple Watch Ultra 2", "AirPods Pro", "HomePod mini", "Apple TV 4K"],
      description: "Полное погружение в мир Apple для дома и работы",
      features: ["Единая экосистема", "Умный дом", "Мультимедийный центр", "Автоматизация"]
    }
  ];

  const appleFeatures = [
    {
      icon: "🔄",
      title: "Беспрерывная работа",
      description: "Начинайте на одном устройстве, продолжайте на другом. Документы, фото, сообщения — всё синхронизируется автоматически."
    },
    {
      icon: "📶",
      title: "Мгновенная синхронизация",
      description: "iCloud обеспечивает бесшовную синхронизацию всех ваших данных между устройствами в реальном времени."
    },
    {
      icon: "🎮",
      title: "Универсальный контроль",
      description: "Управляйте Mac с iPad, используйте iPhone как веб-камеру для Mac — технологии Apple работают вместе."
    },
    {
      icon: "🔒",
      title: "Конфиденциальность и безопасность",
      description: "Встроенная защита данных на всех уровнях. Ваша информация принадлежит только вам."
    }
  ];

  const stats = [
    { number: "1.5+ млрд", label: "Активных устройств Apple в мире" },
    { number: "99%", label: "Удовлетворенных пользователей экосистемы" },
    { number: "24/7", label: "Техническая поддержка и сервис" },
    { number: "200+", label: "Стран с официальной поддержкой" }
  ];

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          Загрузка каталога товаров...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error-message">
          <h3>Ошибка загрузки данных</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">






      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Экосистема <span className="gradient-text">Apple</span> — Единство технологий
          </h1>
          <p className="hero-subtitle">
            Откройте мир, где каждое устройство идеально дополняет другое. {products.length} моделей техники Apple, 
            созданных для безупречной работы вместе. Подберите свою идеальную комбинацию и ощутите мощь единой экосистемы.
          </p>
          
          <div className="hero-buttons">
            <Link to="/catalog">
              <button className="btn btn-primary">
                🛍️ Полный каталог ({products.length} товаров)
              </button>
            </Link>
            <Link to="/ecosystem">
              <button className="btn btn-secondary">
                💰 Подбор по бюджету
              </button>
            </Link>
          </div>
        </div>
      </section>





      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают экосистему Apple?</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>




      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Ключевые преимущества экосистемы Apple</h2>
          <div className="features-grid">
            {appleFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>






      <div className="promo-banner banner-1">
        <div className="container">
          <div className="banner-content">
            <div className="banner-icon">🍎</div>
            <div className="banner-text">
              <h3>Знаете ли вы?</h3>
              <p>Название Apple было выбрано Стивом Джобсом потому, что оно стояло перед Atari в телефонной книге</p>
            </div>
            <div className="banner-fact">
              <span>Факт #1</span>
            </div>
          </div>
        </div>
      </div>







      <section className="products-section">
        <div className="container">
          <h2 className="section-title">🔥 Самые популярные товары</h2>
          <p className="section-subtitle">Товары, которые выбирают большинство наших клиентов</p>
          <div className="products-preview">
            {popularProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-preview-card">
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    getCategoryIcon(product.category)
                  )}
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <div className="product-category">{product.category}</div>
                <p className="product-description">{product.description}</p>
                <div className="product-actions">
                  <button className="btn btn-outline">🛒 В корзину</button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>






      <div className="promo-banner banner-2">
        <div className="container">
          <div className="banner-content">
            <div className="banner-text">
              <h3>📱 Исторический факт</h3>
              <p>Первый iPhone был представлен в 2007 году и навсегда изменил мир мобильных технологий</p>
            </div>
            <div className="banner-stats">
              <div className="stat">
                <span className="number">2007</span>
                <span className="label">Год выпуска</span>
              </div>
            </div>
          </div>
        </div>
      </div>








      <section className="products-section new-arrivals">
        <div className="container">
          <h2 className="section-title">🆕 Новые поступления</h2>
          <p className="section-subtitle">Самые свежие модели и последние обновления</p>
          <div className="products-preview">
            {newArrivals.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-preview-card">
                <div className="product-badge">NEW</div>
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    getCategoryIcon(product.category)
                  )}
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <div className="product-category">{product.category}</div>
                <p className="product-description">{product.description}</p>
                <button className="btn btn-primary">📦 Быстрый заказ</button>
              </Link>
            ))}
          </div>
        </div>
      </section>








      <div className="promo-banner banner-3">
        <div className="container">
          <div className="banner-content">
            <div className="banner-icon">💫</div>
            <div className="banner-text">
              <h3>Экосистема Apple</h3>
              <p>Более 1.5 миллиарда активных устройств по всему миру работают в единой экосистеме</p>
            </div>
            <div className="banner-features">
              <span>🌍 Глобальная синхронизация</span>
              <span>🔗 Беспрерывная работа</span>
            </div>
          </div>
        </div>
      </div>







      <section className="ecosystems-section">
        <div className="container">
          <h2 className="section-title">💫 Готовые решения экосистемы Apple</h2>
          <p className="section-subtitle">Подобранные комплекты для разных задач и бюджетов</p>
          <div className="ecosystems-grid">
            {appleEcosystems.map((eco, index) => (
              <div key={index} className="ecosystem-card">
                <div className="ecosystem-badge">Набор {index + 1}</div>
                <h3>{eco.name}</h3>
                <div className="ecosystem-price">{eco.price}</div>
                <div className="ecosystem-features">
                  <h4>Включает устройства:</h4>
                  <ul className="ecosystem-devices">
                    {eco.devices.map((device, i) => (
                      <li key={i}>✅ {device}</li>
                    ))}
                  </ul>
                  <h4>Преимущества:</h4>
                  <ul className="ecosystem-benefits">
                    {eco.features.map((feature, i) => (
                      <li key={i}>✨ {feature}</li>
                    ))}
                  </ul>
                </div>
                <p className="ecosystem-description">{eco.description}</p>
                <div className="ecosystem-actions">
                  <button className="btn btn-primary">🎯 Выбрать этот набор</button>
                  <button className="btn btn-outline">📋 Детальная консультация</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>







      <div className="promo-banner banner-4">
        <div className="container">
          <div className="banner-content">
            <div className="banner-text">
              <h3>🏆 Высочайшее качество</h3>
              <p>99% пользователей Apple остаются довольными своими устройствами и продолжают покупать технику бренда</p>
            </div>
            <div className="banner-fact">
              <span>Лояльность 99%</span>
            </div>
          </div>
        </div>
      </div>







      <section className="products-section bestsellers">
        <div className="container">
          <h2 className="section-title">🏆 Хиты продаж</h2>
          <p className="section-subtitle">Самые покупаемые товары за последний месяц</p>
          <div className="products-preview">
            {bestSellers.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-preview-card">
                <div className="product-badge">BESTSELLER</div>
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    getCategoryIcon(product.category)
                  )}
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <div className="product-category">{product.category}</div>
                <p className="product-description">{product.description}</p>
                <div className="product-rating">
                  <span>⭐️⭐️⭐️⭐️⭐️ (4.8)</span>
                </div>
                <button className="btn btn-primary">🚀 Купить сейчас</button>
              </Link>
            ))}
          </div>
        </div>
      </section>







      <section className="cta-section">
        <div className="cta-content">
          <h2>🚀 Готовы стать частью экосистемы Apple?</h2>
          <p>
            Наши специалисты помогут подобрать идеальную комбинацию устройств под ваши задачи и бюджет. 
            Получите персональную консультацию и начните использовать технологии будущего уже сегодня!
          </p>
          <div className="cta-buttons">
            <Link to="/ecosystem">
              <button className="btn btn-large">💎 Подобрать экосистему</button>
            </Link>
            <button className="btn btn-secondary">📞 Заказать звонок</button>
            <button className="btn btn-outline">💬 Онлайн-консультация</button>
          </div>
          <div className="cta-info">
            <p>🕒 Консультация 24/7 | 🚚 Бесплатная доставка | 🔄 14 дней на возврат</p>
          </div>
        </div>
      </section>







      <section className="info-section">
        <div className="container">
          <h2 className="section-title">ℹ️ Дополнительная информация</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>🛠️ Сервис и поддержка</h3>
              <p>Официальная гарантия Apple, сервисное обслуживание, консультации по использованию техники.</p>
            </div>
            <div className="info-card">
              <h3>🎁 Акции и бонусы</h3>
              <p>Специальные предложения, trade-in программа, бесплатные аксессуары при покупке комплектов.</p>
            </div>
            <div className="info-card">
              <h3>📦 Доставка и оплата</h3>
              <p>Быстрая доставка по всему городу, несколько способов оплаты, рассрочка и кредит.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;