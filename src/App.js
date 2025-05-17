import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Produtos from "./pages/Produtos";
import DetalhesProduto from "./pages/DetalhesProduto";
import Carrinho from "./pages/Carrinho"; 
import Pedidos from './pages/Pedidos';
import DetalhesPedido from './pages/DetalhesPedido';
import AdminPedidos from './pages/AdminPedidos';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Produtos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produto/:id" element={<DetalhesProduto />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/meus-pedidos" element={<Pedidos />} />
        <Route path="/pedido/:id" element={<DetalhesPedido />} />
        <Route path="/admin/pedidos" element={<AdminPedidos />} />
      </Routes>
    </Router>
  );
}

export default App;
