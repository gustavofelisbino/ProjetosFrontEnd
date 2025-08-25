import { Button } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface BotaoPrimarioProps {
  onClick: () => void;
  children: ReactNode;
}

export const BotaoPrimario: FC<BotaoPrimarioProps> = ({ onClick, children }) => (
  <Button 
    variant="contained" 
    sx={{ 
      padding: '6px', 
      bgcolor: 'primary.main',
      '&:hover': {
        bgcolor: 'primary.dark',
      },
      textTransform: 'none',
      borderRadius: 2,
    }} 
    onClick={onClick}
  >
    {children}
  </Button>
);

export default BotaoPrimario;
