import React from 'react';
import './App.css';
import { AuthProvider } from './utils/AuthContext';
import { CartProvider } from './utils/CartContext';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Router from './routes/Router';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Router />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
