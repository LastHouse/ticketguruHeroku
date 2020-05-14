import React from 'react';
import './App.css';
import { AuthProvider } from './utils/AuthContext';
import { CartProvider } from './utils/CartContext';
import { TicketProvider } from './utils/TicketContext';
import { EventsProvider } from './utils/EventsContext';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Router from './routes/Router';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EventsProvider>
          <TicketProvider>
            <CartProvider>
              <Header />
              <Router />
            </CartProvider>
          </TicketProvider>
        </EventsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
