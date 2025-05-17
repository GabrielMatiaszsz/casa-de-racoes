import axios from 'axios';

const API_URL = 'http://localhost:8083'; // ajuste conforme sua API real

export async function criarPedido(pedido, token) {
  const response = await axios.post(`${API_URL}/pedidos`, pedido, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function listarPedidosPorUsuario(usuarioId, token) {
  const response = await axios.get(`${API_URL}/pedidos/usuario/${usuarioId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function atualizarStatusPedido(pedidoId, status, token) {
  const response = await axios.patch(
    `${API_URL}/pedidos/${pedidoId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}

// ✅ Adicione essa função para listar todos os pedidos (painel admin)
export async function listarTodosPedidos(token) {
  const response = await axios.get(`${API_URL}/pedidos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
