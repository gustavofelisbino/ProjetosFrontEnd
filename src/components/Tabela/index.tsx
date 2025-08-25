import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  TablePagination,
  Chip,
} from "@mui/material";
import { 
  EditOutlined as EditIcon, 
  DeleteOutlined as DeleteIcon, 
  VisibilityOutlined as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const theme = useTheme();

  const tableContent = (
    <Box>
      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow 
              sx={{ 
                color: theme.palette.primary.contrastText,
                fontWeight: 600,
              }}
            >
              <TableCell align="left">Fruta</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Vencimento</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? frutas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : frutas
            ).map((fruta: Fruta) => (
              <TableRow
                key={fruta.id}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.grey[50],
                  },
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    '& .MuiButton-root': {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1" color="text.primary" fontWeight={500}>
                    {fruta.fruta}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1" color="primary.main" fontWeight={500}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(fruta.valor)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(fruta.dataVencimento.toString())}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    icon={fruta.status === 'Ativo' ? <CheckCircleIcon /> : <CancelIcon />}
                    label={fruta.status}
                    color={fruta.status === 'Ativo' ? 'success' : 'error'}
                    size="small"
                    variant="outlined"
                    sx={{
                      '& .MuiChip-icon': {
                        color: fruta.status === 'Ativo' ? 'success.main' : 'error.main',
                      },
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                      size="small"
                      onClick={(e) => handleClickMenu(e, fruta.id)}
                      sx={{ 
                        color: theme.palette.text.secondary,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={frutas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Itens por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
        }
        sx={{
          mt: 2,
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-input': {
            color: 'text.secondary',
            fontSize: '0.875rem',
          },
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiButtonBase-root.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        }}
      />   
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
              if (selectedId !== null) onDetails(selectedId);
              handleCloseMenu();
          }}
        >
          <InfoIcon sx={{ mr: 1 }}/>
          Detalhes
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedId !== null) onEdit(selectedId);
            handleCloseMenu();
          }}
        >
          <EditIcon sx={{ mr: 1 }}/>
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedId !== null) onDelete(selectedId);
            handleCloseMenu();
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon sx={{ mr: 1 }}/>
          Excluir
        </MenuItem>
      </Menu>
    </Box>
  );

  return tableContent;
}