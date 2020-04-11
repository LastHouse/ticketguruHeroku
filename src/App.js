import React from 'react';
import './App.css';
import { AuthProvider } from './utils/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Router from './routes/Router';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
