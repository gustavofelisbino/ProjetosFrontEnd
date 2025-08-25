import { useCarrinho } from '../../../contexts/CarrinhoContext';
import { BotaoPrimario } from './BotaoPrimario';
import type { FC } from 'react';

interface CarrinhoToggleProps {
  onToggle: () => void;
}

export const CarrinhoToggle: FC<CarrinhoToggleProps> = ({ onToggle }) => {
  const { totalItens } = useCarrinho();

  return (
    <BotaoPrimario onClick={onToggle}>
      Carrinho ({totalItens})
    </BotaoPrimario>
  );
};

export default CarrinhoToggle;
