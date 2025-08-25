import type { CarrinhoItem } from '../../../contexts/CarrinhoContext';

export interface ContadorState {
  count: number;
}

export type ContadorAction = { type: 'incrementar' } | { type: 'decrementar' };

export const contadorReducer = (state: ContadorState, action: ContadorAction): ContadorState => {
  switch (action.type) {
    case 'incrementar':
      return { count: state.count + 1 };
    case 'decrementar':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export interface FrutaActionsProps {
  frutaAtual: string;
  onTrocar: () => void;
}

export interface CarrinhoToggleProps {
  onToggle: () => void;
}

export interface CarrinhoItensProps {
  mostrar: boolean;
}

export interface CarrinhoListItemProps {
  item: CarrinhoItem;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
