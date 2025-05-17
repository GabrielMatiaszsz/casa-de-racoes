import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscarProdutoPorId } from '../api/produtoService';
import { useCarrinho } from '../contexts/CarrinhoContext';

export default function DetalhesProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [erro, setErro] = useState(null);
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarProdutoPorId(id);
        setProduto(dados);
      } catch (err) {
        setErro('Produto não encontrado');
      }
    }

    carregar();
  }, [id]);

  if (erro) return <div className="container"><p style={{ color: 'red' }}>{erro}</p></div>;
  if (!produto) return <div className="container"><p>Carregando...</p></div>;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-color)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>{produto.nome}</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>{produto.descricao}</p>

        <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '6px' }}>Tipo: {produto.tipo}</p>
        <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '6px' }}>Peso: {produto.peso} kg</p>

        <p style={{ fontSize: '24px', fontWeight: 600, margin: '24px 0' }}>
          R$ {produto.preco.toFixed(2)}
        </p>

        <button
          onClick={() => adicionarAoCarrinho(produto)}
          disabled={!produto.disponivel}
          style={{
            width: '100%',
            opacity: produto.disponivel ? 1 : 0.5,
            cursor: produto.disponivel ? 'pointer' : 'not-allowed'
          }}
        >
          {produto.disponivel ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
        </button>
      </div>
    </div>
  );
}
