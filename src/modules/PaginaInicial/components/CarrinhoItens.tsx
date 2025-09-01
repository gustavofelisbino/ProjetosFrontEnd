import { Box, List, ListItem, Paper, Typography } from '@mui/material';
import { useCarrinho } from '../../../contexts/CarrinhoContext';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface CarrinhoItensProps {
  mostrar: boolean;
}

export const CarrinhoItens: FC<CarrinhoItensProps> = ({ mostrar }) => {
    const { t } = useTranslation();
    const { itens } = useCarrinho();

  if (!mostrar) return null;

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          {t('itensNoCarrinho')}
        </Typography>

        {itens.length === 0 ? (
          <Typography variant="body1" color="error" fontWeight="bold">
            {t('carrinhoVazio')}
          </Typography>
        ) : (
          <List sx={{ width: '100%' }}>
            {itens.map((item) => (
              <ListItem 
                key={item.id}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottom: 'none'
                  }
                }}
              >
                <Box>
                  <Typography variant="subtitle1">{item.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    R$ {item.preco.toFixed(2)} x {item.quantidade}
                  </Typography>
                </Box>
                <Typography variant="subtitle1">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default CarrinhoItens;
