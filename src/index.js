import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { FilterProvider, CartProvider } from './context';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { ScrollToTop } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
      <FilterProvider>
        <ScrollToTop />
        <ToastContainer position='bottom-right'/>
        <App />
      </FilterProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>
);

