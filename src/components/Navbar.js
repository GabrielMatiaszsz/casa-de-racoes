import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      background: '#fff',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Produtos</Link>
        {usuario && (
          <>
            <Link to="/carrinho" style={linkStyle}>Carrinho</Link>
            <Link to="/meus-pedidos" style={linkStyle}>Meus Pedidos</Link>
          </>
        )}
        {usuario?.email === 'admin@admin.com' && (
          <Link to="/admin/pedidos" style={linkStyle}>Admin</Link>
        )}
        {!usuario && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/cadastro" style={linkStyle}>Cadastro</Link>
          </>
        )}
      </nav>

      {usuario && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: 500 }}>Olá, {usuario.nome}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              background: '#eee',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}

const linkStyle = {
  fontSize: '18px',
  color: '#1C1C1E',
  textDecoration: 'none',
  fontWeight: 500,
  padding: '8px 12px',
  borderRadius: '8px',
  transition: 'background 0.2s ease-in-out'
};
