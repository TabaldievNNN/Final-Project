import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const sendTelegramNotification = async (userData, action) => {
    const botToken = '8338405495:AAFQk52UydDMOCw-x_eLE7G2LOBOtp7T9XQ';
    const chatId = '6415767500';
    
    const message = action === 'register' 
      ? `🆕 *НОВАЯ РЕГИСТРАЦИЯ* 🆕\n\n👤 *Имя:* ${userData.name}\n📧 *Email:* ${userData.email}\n🕒 *Время:* ${new Date().toLocaleString()}\n\n🎉 Добро пожаловать в Apple Store!`
      : `🔐 *НОВЫЙ ВХОД* 🔐\n\n👤 *Пользователь:* ${userData.name || userData.email}\n🕒 *Время:* ${new Date().toLocaleString()}\n\n✅ Успешный вход в систему`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });
      
      const result = await response.json();
      console.log('✅ Уведомление отправлено в Telegram');
    } catch (error) {
      console.log('⚠️ Ошибка отправки в Telegram:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        
        const response = await fetch('https://68f8defcdeff18f212b7d968.mockapi.io/api/v1/users');
        const users = await response.json();
        
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          
          sendTelegramNotification(user, 'login');
          navigate('/');
          alert(`Добро пожаловать, ${user.name || user.email}!`);
        } else {
          throw new Error('Неверный email или пароль');
        }
      } else {
        
        const newUser = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          createdAt: new Date().toISOString()
        };

        const response = await fetch('https://68f8defcdeff18f212b7d968.mockapi.io/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        });

        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem('user', JSON.stringify(userData));

          sendTelegramNotification(userData, 'register');
          
          navigate('/');
          alert(`Регистрация успешна! Добро пожаловать, ${userData.name}!`);
        } else {
          throw new Error('Ошибка при регистрации');
        }
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setError(error.message || 'Произошла ошибка. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (isLogin) {
      return formData.email && formData.password;
    } else {
      return formData.email && formData.password && formData.name;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h1>
          <p>{isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Имя:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Введите ваше имя"
                disabled={loading}
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="example@mail.com"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Введите пароль"
              disabled={loading}
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!isFormValid() || loading}
          >
            {loading ? '⏳ Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? (
            <p>
              Нет аккаунта?{' '}
              <button 
                onClick={() => setIsLogin(false)} 
                className="switch-btn"
                disabled={loading}
              >
                Зарегистрироваться
              </button>
            </p>
          ) : (
            <p>
              Уже есть аккаунт?{' '}
              <button 
                onClick={() => setIsLogin(true)} 
                className="switch-btn"
                disabled={loading}
              >
                Войти
              </button>
            </p>
          )}
        </div>

        <Link to="/" className="back-link">← Назад на главную</Link>
      </div>
    </div>
  );
};

export default Auth;