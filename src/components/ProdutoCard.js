import React from 'react';
import { Link } from 'react-router-dom';

export default function ProdutoCard({ produto }) {
  return (
    <div className="card">
      <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>{produto.nome}</h3>
      <p style={{ color: '#6e6e73', marginBottom: '4px' }}>Tipo: {produto.tipo}</p>
      <p style={{ fontSize: '16px', fontWeight: 500 }}>Peso: {produto.peso}kg</p>
      <p style={{ fontSize: '18px', fontWeight: 600, margin: '16px 0' }}>
        R$ {produto.preco.toFixed(2)}
      </p>
      <Link to={`/produto/${produto.id}`}>
        <button style={{ width: '100%' }}>Ver Detalhes</button>
      </Link>
    </div>
  );
}
