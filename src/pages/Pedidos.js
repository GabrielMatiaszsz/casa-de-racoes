import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { listarPedidosPorUsuario } from '../api/pedidoService';
import { listarProdutos } from '../api/produtoService';
import { Link } from 'react-router-dom';

export default function Pedidos() {
  const { usuario, token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [produtosMap, setProdutosMap] = useState({});
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const [pedidosResp, produtosResp] = await Promise.all([
          listarPedidosPorUsuario(usuario.id, token),
          listarProdutos()
        ]);

        const mapa = {};
        produtosResp.forEach((p) => {
          mapa[p.id] = p.nome;
        });

        setProdutosMap(mapa);
        setPedidos(pedidosResp);
      } catch (err) {
        setErro('Erro ao carregar pedidos');
      }
    }

    if (usuario?.id) carregar();
  }, [usuario, token]);

  const statusColor = (status) => {
    switch (status) {
      case 'PAGO':
        return 'green';
      case 'RECUSADO':
        return 'red';
      default:
        return 'orange';
    }
  };

  return (
    <div className="container">
      <h2 style={{ fontSize: '28px', marginBottom: '1.5rem' }}>Meus Pedidos</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {pedidos.length === 0 && !erro && <p>Nenhum pedido encontrado.</p>}
      
      {pedidos.map((pedido) => (
        <div key={pedido.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '15px', marginBottom: '4px' }}>
                <strong>ID:</strong> <Link to={`/pedido/${pedido.id}`}>{pedido.id}</Link>
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                Data: {new Date(pedido.data).toLocaleString()}
              </p>
              <p style={{ fontSize: '16px', marginTop: '6px' }}>
                Total: <strong>R$ {pedido.total.toFixed(2)}</strong>
              </p>
            </div>
            <div>
              <span
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  color: 'white',
                  backgroundColor: statusColor(pedido.status),
                }}
              >
                {pedido.status || 'PENDENTE'}
              </span>
            </div>
          </div>

          <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem' }}>
            {pedido.produtos.map((p, i) => (
              <li key={i} style={{ fontSize: '15px' }}>
                {produtosMap[p.produtoId] || p.produtoId} — {p.quantidade}x
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
