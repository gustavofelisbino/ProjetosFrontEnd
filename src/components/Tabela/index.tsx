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
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import FrutaImagem from "./ImagemFruta/FrutaImagem";
import { useState } from "react";

export interface Fruta {
  id: number;
  fruta: string;
  valor: number;
  status: 'Ativo' | 'Inativo';
  image: string;
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

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const paginatedFrutas = frutas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ fontWeight: "600", color: "grey.900" }}>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "600" }}>Imagem</TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>Fruta</TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>Valor</TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFrutas.map((fruta) => (
              <TableRow key={fruta.id} sx={{ "&:hover": { backgroundColor: "grey.300" } }}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <FrutaImagem image={fruta.image} name={""} />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{fruta.fruta}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    icon={fruta.status === 'Ativo' ? 
                      <CheckCircleIcon fontSize="small" /> : 
                      <CancelIcon fontSize="small" />
                    }
                    label={fruta.status}
                    color={fruta.status === 'Ativo' ? 'success' : 'error'}
                    variant="outlined"
                    size="small"
                    sx={{
                      fontWeight: 'medium',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      '& .MuiChip-icon': {
                        color: fruta.status === 'Ativo' ? 'success.main' : 'error.main',
                      },
                      borderColor: fruta.status === 'Ativo' ? 'success.main' : 'error.main',
                      bgcolor: fruta.status === 'Ativo' ? 'success.light' : 'error.light',
                      color: fruta.status === 'Ativo' ? 'success.dark' : 'error.dark',
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{formatCurrency(fruta.valor)}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={(e) => handleOpenMenu(e, fruta.id)}>
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
        component="div"
        count={frutas.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Itens por página"
        labelDisplayedRows={({ to, count }) => `Exibindo ${to} de ${count}`}
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
    </Paper>
  );
}