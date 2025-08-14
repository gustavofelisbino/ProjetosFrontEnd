import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Produto {
  nome: string;
  quantidade: number;
}

interface CarrinhoContextType {
  carrinho: Produto[];
  adicionar: (nome: string) => void;
  totalItens: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const adicionar = (nome: string) => {
    setCarrinho(prev => {
      const existente = prev.find(p => p.nome === nome);
      if (existente) {
        return prev.map(p =>
          p.nome === nome ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { nome, quantidade: 1 }];
    });
  };

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionar, totalItens }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = (): CarrinhoContextType => {
  const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
    }
    return context;
};

export default CarrinhoContext;