import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Fruta {
  dataVencimento: Date;
  id: number;
  fruta: string;
  valor: number;
  status: 'Ativo' | 'Inativo';
}

interface FrutaListProps {
  frutas: Fruta[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export function FrutaList({ frutas, onEdit, onDelete, loading = false }: FrutaListProps) {
  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px', alignContent: 'center', justifyContent: 'center', color: 'black'}}>
          {params.value}
        </div>
      ),
    },
    { 
      field: 'fruta', 
      headerName: 'Fruta', 
      width: 250,
    },
    { 
      field: 'valor', 
      headerName: 'Valor', 
      width: 250,
      valueFormatter: (params: { value: number }) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(Number(params.value) || 0);
      }
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 250,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', color: 'black' }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => onEdit(params.row.id)}
            sx={{ fontFamily: 'Roboto', backgroundColor: 'primary.main', color: 'white', padding: '8px 16px', alignContent: 'center', justifyContent: 'center', width: '100%' }}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(params.row.id)}
            sx={{ fontFamily: 'Roboto', backgroundColor: 'error.main', color: 'white', padding: '8px 16px', alignContent: 'center', justifyContent: 'center', width: '100%' }}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', backgroundColor: 'white', borderRadius: 1, boxShadow: 1 }}>
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
            color: 'black'
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
}
