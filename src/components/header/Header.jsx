import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Header.css"

const Header = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(); 
  };

  return (
    <header>
      <Link to="/"> Apple Store</Link>
      
      <Link to="/">Главная</Link>
      <Link to="/catalog">Каталог</Link>
      <Link to="/ecosystem">Экосистема</Link>
      <Link to="/cart">Корзина</Link>
      
      {user ? (
        <div className="user-section">
          <span>Привет, {user.name || user.email}!</span>
          <button onClick={handleLogout} className="logout-btn">Выйти</button>
        </div>
      ) : (
        <Link to="/auth" className="login-btn">Войти</Link>
      )}
    </header>
  );
};

export default Header;