import { Box, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface FrutaSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function FrutaSearch({ searchTerm, onSearchChange }: FrutaSearchProps) {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 1,
      padding: '0 8px',
    }}>
      <SearchIcon sx={{ color: 'text.secondary', marginRight: 1 }} />
      <InputBase
        placeholder="Procurar fruta..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ width: '60%'}}
      />
    </Box>
  );
}
