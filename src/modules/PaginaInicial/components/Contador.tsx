import { Box, Typography } from '@mui/material';
import { BotaoPrimario } from './BotaoPrimario';
import type { ContadorAction, ContadorState } from '../types';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ContadorProps {
  state: ContadorState;
  dispatch: (action: ContadorAction) => void;
}

export const Contador: FC<ContadorProps> = ({ state, dispatch }) => {
    const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        {t('contador')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
        <BotaoPrimario onClick={() => dispatch({ type: 'decrementar' })}>
          {t('decrementar')}
        </BotaoPrimario>
        <BotaoPrimario onClick={() => dispatch({ type: 'incrementar' })}>
          {t('incrementar')}
        </BotaoPrimario>
      </Box>
      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 500 }}>
        {state.count}
      </Typography>
    </Box>
  );
};

export default Contador;
