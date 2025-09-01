import { useCarrinho } from '../../../contexts/CarrinhoContext';
import { BotaoPrimario } from './BotaoPrimario';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface CarrinhoToggleProps {
  onToggle: () => void;
}

export const CarrinhoToggle: FC<CarrinhoToggleProps> = ({ onToggle }) => {
    const { t } = useTranslation();
  const { totalItens } = useCarrinho();

  return (
    <BotaoPrimario onClick={onToggle}>
      {t('carrinho')} ({totalItens})
    </BotaoPrimario>
  );
};

export default CarrinhoToggle;
