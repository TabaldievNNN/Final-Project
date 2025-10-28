import React from 'react';
import Home from '../pages/home/Home';
import Cotalog from '../pages/cotalog/Cotalog';
import Cart from '../pages/cart/Cart';
import ProductDet from '../pages/productdet/ProductDet';
import { Route, Routes } from 'react-router-dom';
import  Ecosis  from '../pages/ecosystem/Ecosis';
import Auth from '../components/Auth/Auth';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/catalog" element={<Cotalog/>} />
      <Route path="/ecosystem" element={<Ecosis/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/product/:id" element={<ProductDet/>} />
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
  );
};

export default AppRoutes;