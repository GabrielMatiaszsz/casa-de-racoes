import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import reportWebVitals from './reportWebVitals';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
