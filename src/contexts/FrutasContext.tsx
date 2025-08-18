import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Fruta {
  id: number;
  fruta: string;
  valor: number;
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
    { id: 1, fruta: 'Banana', valor: 1.99 },
    { id: 2, fruta: 'Manga', valor: 2.99 },
    { id: 3, fruta: 'Laranja', valor: 3.99 },
    { id: 4, fruta: 'Uva', valor: 4.99 },
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
