import React from 'react';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { useAuth } from '../contexts/AuthContext';
import { criarPedido } from '../api/pedidoService';

export default function Carrinho() {
  const { itens, removerDoCarrinho, limparCarrinho } = useCarrinho();
  const { usuario, token } = useAuth();
  const [mensagem, setMensagem] = React.useState(null);
  const [erro, setErro] = React.useState(null);

  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  const handleFinalizar = async () => {
    try {
      const pedido = {
        usuarioId: usuario?.id,
        produtos: itens.map((item) => ({
          produtoId: item.id,
          quantidade: item.quantidade
        })),
        total
      };

      await criarPedido(pedido, token);
      setMensagem('Pedido realizado com sucesso!');
      limparCarrinho();
    } catch (err) {
      setErro('Erro ao finalizar pedido.');
    }
  };

  if (itens.length === 0 && !mensagem) {
    return <div className="container"><h2>Seu carrinho está vazio.</h2></div>;
  }

  return (
    <div className="container">
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Meu Carrinho</h2>

      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {itens.map((item) => (
        <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>{item.nome}</h3>
            <p style={{ margin: 0 }}>Qtd: {item.quantidade}</p>
            <p style={{ margin: 0 }}>Preço: R$ {item.preco.toFixed(2)}</p>
          </div>
          <button
            style={{ backgroundColor: '#ef4444' }}
            onClick={() => removerDoCarrinho(item.id)}
          >
            Remover
          </button>
        </div>
      ))}

      <div className="card highlight-green" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Total</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>R$ {total.toFixed(2)}</p>
        <button onClick={handleFinalizar} style={{ marginTop: '1rem', width: '100%' }}>
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
