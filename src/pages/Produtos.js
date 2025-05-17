import React, { useEffect, useState } from 'react';
import { listarProdutos } from '../api/produtoService';
import ProdutoCard from '../components/ProdutoCard';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    listarProdutos().then(setProdutos);
  }, []);

  return (
    <div className="container">
      <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Rações disponíveis</h2>
      {produtos.map((produto) => (
        <ProdutoCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}
