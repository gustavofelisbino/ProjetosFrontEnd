import {
  Box,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { 
  EditOutlined as EditIcon, 
  DeleteOutlined as DeleteIcon, 
  VisibilityOutlined as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { DataGrid, type GridColDef, type GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { useState } from 'react';

export interface Fruta {
  id: number;
  fruta: string;
  dataVencimento: Date;
  valor: number;
  status: 'Ativo' | 'Inativo';
  descricao?: string;
}

interface FrutasTableProps {
  frutas: Fruta[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDetails: (id: number) => void;
}

export default function FrutasTable({ frutas, onEdit, onDelete, onDetails }: FrutasTableProps) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    };
    try {
      const date = dateString.includes('T') ? new Date(dateString) : new Date(dateString);
      return date.toLocaleDateString('pt-BR', options);
    } catch (e) {
      console.error(e);
      return dateString;
    }
  };

  const columns: GridColDef[] = [
    { 
      field: 'fruta', 
      headerName: 'Fruta',
      width: 150,
      flex: 0.5,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="subtitle1" color="text.primary" fontWeight={500} >
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'valor', 
      headerName: 'Valor', 
      width: 150,
      flex: 0.5,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body1" color="primary.main" fontWeight={500} sx={{ textAlign: 'center' }}>
          {formatCurrency(params.value)}
        </Typography>
      )
    },
    { 
      field: 'dataVencimento', 
      headerName: 'Vencimento', 
      width: 150,
      flex: 0.5,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" color="text.secondary">
          {formatDate(params.value.toString())}
        </Typography>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      flex: 0.5,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          icon={params.value === 'Ativo' ? <CheckCircleIcon /> : <CancelIcon />}
          label={params.value}
          variant="outlined"
          sx={{
            color: params.value === 'Ativo' ? 'success.main' : 'error.main',
            borderColor: params.value === 'Ativo' ? 'success.main' : 'error.main',
            '& .MuiChip-icon': {
              color: params.value === 'Ativo' ? 'success.main' : 'error.main',
            },
          }}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      flex: 0.3,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <IconButton
            onClick={(e) => handleMenuOpen(e, params.row.id)}
            size="small"
            color="inherit"
            aria-label="opções"
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rowHeight = 60;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleAction = (action: (id: number) => void) => {
    if (selectedId !== null) {
      action(selectedId);
      handleMenuClose();
    }
  };

  const headerHeight = 56;
  const footerHeight = 53;
  const totalHeight = Math.max(
    Math.min(
      Math.min(frutas.length, paginationModel.pageSize) * rowHeight + headerHeight + footerHeight,
      600
    ),
    headerHeight + footerHeight + rowHeight
  );

  const tableContent = (
    <Box sx={{ width: '100%', minHeight: '200px', height: totalHeight }}>
      <DataGrid
        rows={frutas}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableMultipleRowSelection
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        slots={{
          toolbar: GridToolbar,
        }}
        rowHeight={rowHeight}
        sx={{
          border: 'none',
          borderRadius: 2,
          bgcolor: '#ffffff',
          '& .MuiDataGrid-cell': {
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            '&:focus, &:focus-within, &:active': {
              outline: 'none !important',
            },
            '& .MuiDataGrid-cellContent': {
              pointerEvents: 'auto',
            },
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#F5F5F5',
            '& .MuiDataGrid-columnHeader': {
              '&:focus, &:focus-within, &:active': {
                outline: 'none !important',
              },
              '&:hover': {
                backgroundColor: '#F5F5F5 !important',
              },
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                pointerEvents: 'none',
              },
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none !important',
            },
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#616161',
          },
          '& .MuiTablePagination-root': {
            color: '#616161',
          },
          '& .MuiInputBase-root': {
            color: '#616161',
          },
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          elevation: 6,
          sx: {
            minWidth: '120px',
          },
        }}
      >
        <MenuItem onClick={() => handleAction(onDetails)}>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ fontWeight: 'bold' }}>Detalhes</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction(onEdit)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ fontWeight: 'bold' }}>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction(onDelete)} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ fontWeight: 'bold' }}>Excluir</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );

  return tableContent;
}