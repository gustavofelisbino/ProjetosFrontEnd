import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ZoomIn } from '@mui/icons-material';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Fruta {
  dataVencimento: Date;
  id: number;
  fruta: string;
  valor: number;
  status: 'Ativo' | 'Inativo';
}

interface FrutaListProps {
  frutas: Fruta[];
  onDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export const FrutaList: FC<FrutaListProps> = ({ frutas, onEdit, onDelete, onDetails, loading = false }) => {
    const { t } = useTranslation();
    const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: t('id'), 
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', color: 'black', width: '100%' }}>
          {params.value}
        </Box>
      ),
    },
    { 
      field: 'fruta', 
      headerName: t('fruta'), 
      width: 250,
    },
    { 
      field: 'valor', 
      headerName: t('valor'), 
      width: 250,
      valueFormatter: (params: { value: number }) =>
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(Number(params.value) || 0),
    },
    {
      field: 'actions',
      headerName: t('acoes'),
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', width: '100%' }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<ZoomIn />}
            onClick={() => onDetails(params.row.id)}
            sx={{ fontFamily: 'Roboto' }}
          >
            {t('detalhes')}
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => onEdit(params.row.id)}
            sx={{ fontFamily: 'Roboto' }}
          >
            {t('editar')}
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(params.row.id)}
            sx={{ fontFamily: 'Roboto' }}
          >
            {t('excluir')}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <DataGrid
        rows={frutas}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'primary.main',
            color: 'black',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            padding: '8px 16px',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      />
    </Box>
  );
};

export default FrutaList;
