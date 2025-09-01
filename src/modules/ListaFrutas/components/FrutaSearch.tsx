import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { FC } from 'react';

interface FrutaSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const FrutaSearch: FC<FrutaSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          borderRadius: 1,
          padding: '4px 12px',
          minWidth: '300px',
          margin: '0 auto',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
          '&:focus-within': {
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
            backgroundColor: 'white',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
        <InputBase
          placeholder="Pesquisar frutas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            width: '100%',
            '& .MuiInputBase-input': {
              padding: '4px 0',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default FrutaSearch;
