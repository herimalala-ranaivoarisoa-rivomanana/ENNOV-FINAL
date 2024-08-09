import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductFormPage from './pages/ProductFormPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductListPage />} />
          <Route path="login" element={<Login />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="products/edit/:id" element={<ProductFormPage />} />
          <Route path="products/create" element={<ProductFormPage />} />
          <Route path="error" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
