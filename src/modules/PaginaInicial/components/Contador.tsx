import { Box, Typography } from '@mui/material';
import { BotaoPrimario } from './BotaoPrimario';
import type { ContadorAction, ContadorState } from '../types';
import type { FC } from 'react';

interface ContadorProps {
  state: ContadorState;
  dispatch: (action: ContadorAction) => void;
}

export const Contador: FC<ContadorProps> = ({ state, dispatch }) => {
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Contador
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
        <BotaoPrimario onClick={() => dispatch({ type: 'decrementar' })}>
          Decrementar
        </BotaoPrimario>
        <BotaoPrimario onClick={() => dispatch({ type: 'incrementar' })}>
          Incrementar
        </BotaoPrimario>
      </Box>
      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 500 }}>
        {state.count}
      </Typography>
    </Box>
  );
};

export default Contador;
