import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface CarrinhoItem {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
  imagem?: string;
}

interface CarrinhoContextData {
  itens: CarrinhoItem[];
  totalItens: number;
  valorTotal: number;
  adicionarItem: (item: Omit<CarrinhoItem, 'quantidade'>) => void;
  removerItem: (id: string) => void;
  atualizarQuantidade: (id: string, quantidade: number) => void;
  limparCarrinho: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextData | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [itens, setItens] = useState<CarrinhoItem[]>([]);

  const totalItens = useMemo(
    () => itens.reduce((total, item) => total + item.quantidade, 0),
    [itens]
  );

  const valorTotal = useMemo(
    () => itens.reduce((total, item) => total + (item.preco * item.quantidade), 0),
    [itens]
  );

  const adicionarItem = useCallback((item: Omit<CarrinhoItem, 'quantidade'>) => {
    setItens((prevItens) => {
      const itemExistente = prevItens.find((i) => i.id === item.id);

      if (itemExistente) {
        return prevItens.map((i) =>
          i.id === item.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }

      return [...prevItens, { ...item, quantidade: 1 }];
    });
  }, []);

  const removerItem = useCallback((id: string) => {
    setItens((prevItens) => prevItens.filter((item) => item.id !== id));
  }, []);

  const atualizarQuantidade = useCallback((id: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerItem(id);
      return;
    }

    setItens((prevItens) =>
      prevItens.map((item) =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  }, [removerItem]);

  const limparCarrinho = useCallback(() => {
    setItens([]);
  }, []);

  const value = useMemo(
    () => ({
      itens,
      totalItens,
      valorTotal,
      adicionarItem,
      removerItem,
      atualizarQuantidade,
      limparCarrinho,
    }),
    [itens, totalItens, valorTotal, adicionarItem, removerItem, atualizarQuantidade, limparCarrinho]
  );

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = (): CarrinhoContextData => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};

export default CarrinhoContext;