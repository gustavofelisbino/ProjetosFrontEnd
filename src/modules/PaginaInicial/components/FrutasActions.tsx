import { Box } from '@mui/material';
import { useCarrinho } from '../../../contexts/CarrinhoContext';
import { BotaoPrimario } from './BotaoPrimario';
import type { Fruta } from '../../../contexts/FrutasContext';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface FrutasActionsProps {
  frutaAtual: Fruta;
  onTrocar: () => void;
}

export const FrutasActions: FC<FrutasActionsProps> = ({ frutaAtual, onTrocar }) => {
    const { t } = useTranslation();
  const { adicionarItem } = useCarrinho();

  const handleAdicionarAoCarrinho = () => {
    adicionarItem({
      id: frutaAtual.id.toString(),
      nome: frutaAtual.fruta,
      preco: frutaAtual.valor,
      imagem: frutaAtual.image,
    });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
      <BotaoPrimario onClick={onTrocar}>{t('trocar')}</BotaoPrimario>
      <BotaoPrimario onClick={handleAdicionarAoCarrinho}>
        {t('adicionarAoCarrinho')}
      </BotaoPrimario>
    </Box>
  );
};

export default FrutasActions;
