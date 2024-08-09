import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import App from './App';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
