import React, { useState, useReducer, useEffect } from 'react';
import { CarrinhoProvider, useCarrinho } from '../../contexts/CarrinhoContext';
import '../../App.css';
import { Button } from '@mui/material';

interface IState {
  count: number;
}

type TAction = { type: 'incrementar' | 'decrementar' };

const contadorReducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case 'incrementar':
      return { count: state.count + 1 };
    case 'decrementar':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const Frutas: React.FC<{ frutas: string[]; onTrocar: () => void; onAdicionar: (item: string) => void }> = ({ frutas, onTrocar, onAdicionar }) => {
  return (
    <div>
      <div className='buttons'>
        <Button onClick={onTrocar}>Trocar</Button>
        <Button onClick={() => onAdicionar(frutas[0])}>Adicionar ao Carrinho</Button>
      </div>
    </div>
  );
};

const CarrinhoToggle: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const { totalItens } = useCarrinho();
  return (
    <button className='btn-carrinho' onClick={onToggle}>
      {totalItens}
    </button>
  );
};

const CarrinhoLista: React.FC<{ mostrar: boolean }> = ({ mostrar }) => {
  const { carrinho } = useCarrinho();

  if (!mostrar) return null;

  return (
    <div className='carrinho-lista'>
      <h3>Itens no Carrinho</h3>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio</p>
      ) : (
        <ul>
          {carrinho.map((item: { nome: string; quantidade: number }, idx: number) => (
            <li key={idx}>
              {item.nome} - {item.quantidade}x
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AppInterno: React.FC = () => {
  const [frutas, setFrutas] = useState<string[]>(['Banana']);
  const [state, dispatch] = useReducer(contadorReducer, { count: 0 });
  const { adicionar } = useCarrinho();
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  const handleTrocarFruta = () => {
    setFrutas(prev => {
      if (prev[0] === 'Banana') return ['Maçã'];
      if (prev[0] === 'Maçã') return ['Laranja'];
      if (prev[0] === 'Laranja') return ['Uva'];
      return ['Banana'];
    });
  };

  useEffect(() => {
    console.log(`O valor do contador é: ${state.count}`);
  }, [state.count]);

  return (
    <div className='App'>
      <CarrinhoToggle onToggle={() => setMostrarCarrinho(prev => !prev)} />

      <h1>Contador</h1>
      <p className='troca'>{frutas.join()}</p>
      <div className='buttons'>
        <Button onClick={() => dispatch({ type: 'incrementar' })}>Incrementar</Button>
        <Button onClick={() => dispatch({ type: 'decrementar' })}>Decrementar</Button>
      </div>

      <span className='count'>{state.count}</span>

      <h2>Ações</h2>

      <Frutas frutas={frutas} onTrocar={handleTrocarFruta} onAdicionar={adicionar} />

      <div>
        <CarrinhoLista mostrar={mostrarCarrinho} />
      </div>

      <div className='bg-blur'></div>
      <div className='bg-overlay'></div>
    </div>
  );
};

const App: React.FC = () => (
  <CarrinhoProvider>
    <AppInterno />
  </CarrinhoProvider>
);

export default App;
