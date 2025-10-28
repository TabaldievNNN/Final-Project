const API_BASE = 'https://68f8defcdeff18f212b7d968.mockapi.io/api/v1';

export const productService = {

  getAllProducts: async () => {
    try {
      console.log('🔄 Загружаем товары из:', `${API_BASE}/products`);
      const response = await fetch(`${API_BASE}/products`);
      
      console.log('📡 Статус ответа:', response.status);
      console.log('📡 Ответ OK:', response.ok);
      
      if (!response.ok) throw new Error('Ошибка загрузки товаров');
      
      const data = await response.json();
      console.log('✅ Товары загружены:', data);
      console.log('📦 Количество товаров:', data.length);
      
      return data;
    } catch (error) {
      console.error('❌ ProductService Error:', error);
      throw error;
    }
  }
};
