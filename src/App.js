import React from 'react';
import './App.css';
import { AuthProvider } from './utils/AuthContext';
import { CartProvider } from './utils/CartContext';
import { TicketProvider } from './utils/TicketContext';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Router from './routes/Router';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TicketProvider>
          <CartProvider>
            <Header />
            <Router />
          </CartProvider>
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
