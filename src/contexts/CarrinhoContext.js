import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setItens((prev) => {
      const jaExiste = prev.find((item) => item.id === produto.id);
      if (jaExiste) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (id) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => setItens([]);

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
