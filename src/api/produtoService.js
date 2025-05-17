import axios from 'axios';

const API_URL = 'http://localhost:8082'; // substitua pela URL real do serviço de catálogo

export async function listarProdutos() {
  const response = await axios.get(`${API_URL}/produtos`);
  return response.data;
}

export async function buscarProdutoPorId(id) {
  const response = await axios.get(`${API_URL}/produtos/${id}`);
  return response.data;
}