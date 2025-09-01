import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Fruta {
  dataVencimento: Date;
  id: number;
  fruta: string;
  valor: number;
  status: 'Ativo' | 'Inativo';
  image?: string;
  descricao?: string
}

interface FrutasContextType {
  frutas: Fruta[];
  adicionarFruta: (fruta: Omit<Fruta, 'id'>) => void;
  atualizarFruta: (id: number, fruta: Omit<Fruta, 'id'>) => void;
  removerFruta: (id: number) => void;
}

const FrutasContext = createContext<FrutasContextType | undefined>(undefined);

export const FrutasProvider = ({ children }: { children: ReactNode }) => {
  const [frutas, setFrutas] = useState<Fruta[]>([
    { 
      id: 1, 
      fruta: 'Maçã', 
      valor: 5.50,
      status: 'Ativo',
      dataVencimento: new Date(),
      descricao: ""
    },
    { 
      id: 2, 
      fruta: 'Banana', 
      valor: 3.20,
      status: 'Ativo',
      dataVencimento: new Date(Date.now() + 86400000),
      descricao: ""
    },
    { 
      id: 3, 
      fruta: 'Laranja', 
      valor: 4.00,
      status: 'Ativo',
      dataVencimento: new Date(Date.now() + 2 * 86400000),
      descricao: ""
    },
    { 
      id: 4, 
      fruta: 'Morango', 
      valor: 8.90,
      status: 'Ativo',
      dataVencimento: new Date(Date.now() + 3 * 86400000),
      descricao: ""
    },
  ]);

  const adicionarFruta = (novaFruta: Omit<Fruta, 'id'>) => {
    const newId = frutas.length > 0 ? Math.max(...frutas.map(f => f.id)) + 1 : 1;
    setFrutas([...frutas, { ...novaFruta, id: newId }]);
  };

  const atualizarFruta = (id: number, frutaAtualizada: Omit<Fruta, 'id'>) => {
    setFrutas(frutas.map(fruta => 
      fruta.id === id ? { ...frutaAtualizada, id } : fruta
    ));
  };

  const removerFruta = (id: number) => {
    setFrutas(frutas.filter(fruta => fruta.id !== id));
  };

  return (
    <FrutasContext.Provider value={{ frutas, adicionarFruta, atualizarFruta, removerFruta }}>
      {children}
    </FrutasContext.Provider>
  );
};

export const useFrutas = () => {
  const context = useContext(FrutasContext);
  if (context === undefined) {
    throw new Error('useFrutas deve ser usado dentro de um FrutasProvider');
  }
  return context;
};