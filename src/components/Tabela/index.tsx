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
} from "@mui/material";
import { EditOutlined as EditIcon, DeleteOutlined as DeleteIcon, VisibilityOutlined as InfoIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import FrutaImagem from "./ImagemFruta/FrutaImagem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export interface Fruta {
  id: number;
  fruta: string;
  valor: number;
  status?: "Ativo" | "Inativo" | "Bloqueado";
  image?: string;
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

  const navigate = useNavigate();

  const paginatedFrutas = frutas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ fontWeight: "600", color: "grey.900" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>Fruta</TableCell>
              <TableCell align="right" sx={{ fontWeight: "600" }}>Valor</TableCell>
              <TableCell align="right" sx={{ fontWeight: "600" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFrutas.map((fruta) => (
              <TableRow key={fruta.id} sx={{ "&:hover": { backgroundColor: "grey.300" } }}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <FrutaImagem name={fruta.fruta} image={fruta.image} />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">{formatCurrency(fruta.valor)}</Typography>
                </TableCell>
                <TableCell align="right">
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
              navigate('/detalhes-frutas');
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