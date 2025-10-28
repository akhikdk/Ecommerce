import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import Login from './pages/Login';
import Details from './pages/Details';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="home" element={<Home/>}/>
        <Route path="addProduct" element={<AddProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}
