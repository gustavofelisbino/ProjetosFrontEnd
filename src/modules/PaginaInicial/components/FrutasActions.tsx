import { Box } from '@mui/material';
import { useCarrinho } from '../../../contexts/CarrinhoContext';
import { BotaoPrimario } from './BotaoPrimario';
import type { Fruta } from '../../../contexts/FrutasContext';
import type { FC } from 'react';

interface FrutasActionsProps {
  frutaAtual: Fruta;
  onTrocar: () => void;
}

export const FrutasActions: FC<FrutasActionsProps> = ({ frutaAtual, onTrocar }) => {
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
      <BotaoPrimario onClick={onTrocar}>Trocar</BotaoPrimario>
      <BotaoPrimario onClick={handleAdicionarAoCarrinho}>
        Adicionar ao Carrinho
      </BotaoPrimario>
    </Box>
  );
};

export default FrutasActions;
