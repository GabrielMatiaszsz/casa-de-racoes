import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { listarTodosPedidos, atualizarStatusPedido } from '../api/pedidoService';
import { listarProdutos } from '../api/produtoService';

export default function AdminPedidos() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [produtosMap, setProdutosMap] = useState({});
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const [todosPedidos, produtos] = await Promise.all([
          listarTodosPedidos(token),
          listarProdutos()
        ]);

        const mapa = {};
        produtos.forEach(p => {
          mapa[p.id] = p.nome;
        });

        setPedidos(todosPedidos);
        setProdutosMap(mapa);
      } catch (err) {
        setErro('Erro ao carregar pedidos');
      }
    }

    carregar();
  }, [token]);

  const handleAtualizarStatus = async (id, novoStatus) => {
    try {
      await atualizarStatusPedido(id, novoStatus, token);
      setPedidos(prev =>
        prev.map(p =>
          p.id === id ? { ...p, status: novoStatus } : p
        )
      );
    } catch (err) {
      alert('Erro ao atualizar status');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto' }}>
      <h2>Painel Administrativo - Todos os Pedidos</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {pedidos.map((pedido) => (
        <div key={pedido.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <p><strong>ID:</strong> {pedido.id}</p>
          <p><strong>Usuário ID:</strong> {pedido.usuarioId}</p>
          <p><strong>Data:</strong> {new Date(pedido.data).toLocaleString()}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span style={{
              color:
                pedido.status === 'PAGO' ? 'green' :
                pedido.status === 'RECUSADO' ? 'red' : 'orange'
            }}>
              {pedido.status || 'PENDENTE'}
            </span>
          </p>
          <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
          <p><strong>Produtos:</strong></p>
          <ul>
            {pedido.produtos.map((p, i) => (
              <li key={i}>
                {produtosMap[p.produtoId] || p.produtoId} — {p.quantidade}x
              </li>
            ))}
          </ul>

          {pedido.status !== 'PAGO' && (
            <>
              <button onClick={() => handleAtualizarStatus(pedido.id, 'PAGO')} style={{ marginRight: '10px' }}>
                Marcar como PAGO
              </button>
              <button onClick={() => handleAtualizarStatus(pedido.id, 'RECUSADO')}>
                Recusar
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
