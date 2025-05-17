import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../api/authService';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUsuario(email, senha);
      login(response.usuario, response.token);
      navigate('/');
    } catch (err) {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--bg-color)'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ fontSize: '26px', marginBottom: '24px', textAlign: 'center' }}>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Email</label>
          <input
            type="email"
            value={email}
            placeholder="voce@exemplo.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Senha</label>
          <input
            type="password"
            value={senha}
            placeholder="********"
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}
          <button type="submit" style={{ marginTop: '20px', width: '100%' }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
