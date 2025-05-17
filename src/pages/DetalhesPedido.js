import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listarPedidosPorUsuario, atualizarStatusPedido } from '../api/pedidoService';
import { listarProdutos } from '../api/produtoService';

export default function DetalhesPedido() {
  const { id } = useParams(); // pedidoId
  const { usuario, token } = useAuth();
  const [pedido, setPedido] = useState(null);
  const [produtosMap, setProdutosMap] = useState({});
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const pedidos = await listarPedidosPorUsuario(usuario.id, token);
        const pedidoEncontrado = pedidos.find(p => p.id === id);
        if (!pedidoEncontrado) {
          setErro('Pedido não encontrado');
          return;
        }
        setPedido(pedidoEncontrado);

        const produtos = await listarProdutos();
        const mapa = {};
        produtos.forEach(p => {
          mapa[p.id] = p.nome;
        });
        setProdutosMap(mapa);
      } catch (err) {
        setErro('Erro ao carregar pedido');
      }
    }

    carregar();
  }, [id, usuario, token]);

  const handleSimularPagamento = async () => {
    try {
      const atualizado = await atualizarStatusPedido(pedido.id, 'PAGO', token);
      setPedido({ ...pedido, status: atualizado.status });
    } catch (err) {
      alert('Erro ao atualizar status do pagamento');
    }
  };

  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;
  if (!pedido) return <p>Carregando detalhes do pedido...</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto' }}>
      <h2>Detalhes do Pedido</h2>
      <p><strong>ID:</strong> {pedido.id}</p>
      <p><strong>Data:</strong> {new Date(pedido.data).toLocaleString()}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span
          style={{
            color:
              pedido.status === 'PAGO' ? 'green' :
              pedido.status === 'RECUSADO' ? 'red' : 'orange'
          }}
        >
          {pedido.status || 'PENDENTE'}
        </span>
      </p>
      <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>

      {pedido.status !== 'PAGO' && (
        <button
          onClick={handleSimularPagamento}
          style={{
            marginBottom: '20px',
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Simular Pagamento
        </button>
      )}

      <h4>Itens:</h4>
      <ul>
        {pedido.produtos.map((p, index) => (
          <li key={index}>
            {produtosMap[p.produtoId] || p.produtoId} — Quantidade: {p.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
}
