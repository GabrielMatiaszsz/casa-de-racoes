import axios from 'axios';

const API_URL = 'http://localhost:8081'; // Alterar essa parada aqui para a rota que vai estar sendo usada para login

export async function loginUsuario(email, senha) {
  const response = await axios.post(`${API_URL}/login`, { email, senha });
  return response.data; // Ex: { token, usuario }
}

export async function cadastrarUsuario(dados) {
  const response = await axios.post(`${API_URL}/usuarios`, dados);
  return response.data;
}
