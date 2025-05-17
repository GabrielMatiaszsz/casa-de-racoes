import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../api/authService';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cadastrarUsuario({ nome, email, senha });
      setErro(null);
      setSucesso('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErro('Erro ao cadastrar. Tente novamente.');
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
        <h2 style={{ fontSize: '26px', marginBottom: '24px', textAlign: 'center' }}>Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green', marginTop: '10px' }}>{sucesso}</p>}

          <button type="submit" style={{ marginTop: '20px', width: '100%' }}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
