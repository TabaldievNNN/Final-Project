import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService, cartService } from '../../api';
import './Cotalog.css';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить товары: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('🎯 Adding to cart:', product);
    
    try {
      const updatedCart = cartService.addToCart(product);
      console.log('✅ Cart updated:', updatedCart);
      
      setAddedToCart(prev => ({ ...prev, [product.id]: true }));
      
      setTimeout(() => {
        setAddedToCart(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
    }
  };

  const handleCategoryChange = (category, event) => {
    if (event) {
      event.preventDefault();
    }
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(value);
    setPriceRange(newPriceRange);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleResetFilters = (event) => {
    if (event) {
      event.preventDefault();
    }
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 5000]);
    setSortBy('name');
  };

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const categories = ['all', ...new Set(products.map(product => product.category))];

  const getCategoryIcon = (category) => {
    const icons = {
      iphone: '📱',
      mac: '💻',
      ipad: '📱',
      watch: '⌚',
      airpods: '🎧',
      accessories: '🔧',
      all: '📦'
    };
    return icons[category] || '📦';
  };

  const formatPrice = (price) => {
    return `$${price}`;
  };

  if (loading) {
    return (
      <div className="catalog-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          Загрузка каталога...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalog-page">
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
    <div className="catalog-page">
      <section className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Каталог товаров Apple</h1>
          <p className="catalog-subtitle">
            {products.length} моделей техники для вашей идеальной экосистемы
          </p>
          
          <div className="search-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>
      </section>

      <div className="catalog-content">
        <div className="container">
          <div className="catalog-layout">
            
            <aside className="filters-sidebar">
              <div className="filters-section">
                <h3>Фильтры</h3>
                
                <div className="filter-group">
                  <h4>Категория</h4>
                  <div className="category-filters">
                    {categories.map(category => (
                      <button
                        key={category}
                        type="button"
                        className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                        onClick={(e) => handleCategoryChange(category, e)}
                      >
                        <span className="category-icon">
                          {getCategoryIcon(category)}
                        </span>
                        <span className="category-name">
                          {category === 'all' ? 'Все товары' : category}
                        </span>
                        <span className="category-count">
                          ({category === 'all' ? products.length : products.filter(p => p.category === category).length})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <h4>Цена: ${priceRange[0]} - ${priceRange[1]}</h4>
                  <div className="price-range">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, e.target.value)}
                      className="range-input"
                    />
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, e.target.value)}
                      className="range-input"
                    />
                  </div>
                  <div className="price-labels">
                    <span>$0</span>
                    <span>$2500</span>
                    <span>$5000</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-outline reset-filters"
                  onClick={handleResetFilters}
                >
                  🗑️ Сбросить фильтры
                </button>
              </div>
            </aside>

            <main className="products-main">
              <div className="products-header">
                <div className="results-info">
                  Найдено товаров: <strong>{filteredProducts.length}</strong>
                  {searchTerm && (
                    <span> по запросу "{searchTerm}"</span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span> в категории "{selectedCategory}"</span>
                  )}
                </div>
                
                <div className="sort-options">
                  <label>Сортировка:</label>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="sort-select"
                  >
                    <option value="name">По названию</option>
                    <option value="price-low">По цене (сначала дешевые)</option>
                    <option value="price-high">По цене (сначала дорогие)</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="no-products">
                  <div className="no-products-icon">😔</div>
                  <h3>Товары не найдены</h3>
                  <p>Попробуйте изменить параметры поиска или фильтры</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleResetFilters}
                  >
                    Показать все товары
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                      <div className="product-image">
                        {product.image ? (
                          <img src={product.image} alt={product.name} />
                        ) : (
                          <div className="product-icon">
                            {getCategoryIcon(product.category)}
                          </div>
                        )}
                      </div>
                      
                      <div className="product-info">
                        <div className="product-category-badge">
                          {product.category}
                        </div>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">
                          {product.description}
                        </p>
                        
                        {product.specs && (
                          <div className="product-specs">
                            {product.specs.slice(0, 3).map((spec, index) => (
                              <span key={index} className="spec-tag">
                                {spec}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="product-footer">
                        <div className="product-price">
                          {formatPrice(product.price)}
                        </div>
                        <div className="product-actions">
                          <button 
                            type="button"
                            className={`btn btn-primary ${addedToCart[product.id] ? 'added-to-cart' : ''}`}
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            {addedToCart[product.id] ? '✅ Добавлено!' : '🛒 В корзину'}
                          </button>
                          <div className="btn btn-outline">
                            📖 Подробнее
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;