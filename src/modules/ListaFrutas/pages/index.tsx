import { Box, Button, Typography, Paper } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { useFrutas } from '../../../contexts/FrutasContext';
import { FrutaForm } from '../components/FrutaForm';
import type { Fruta } from '../../../components/Tabela';
import FrutaSearch from '../components/FrutaSearch';
import FrutasTable from '../../../components/Tabela';
import PrimarySearchAppBar from "../../../components/AppBar";
import { DialogExcluir } from '../../../components/Dialog/DialogExcluir';
import { DialogDetalhes } from '../components/DialogDetalhes/DialogDetalhes';
import { useTranslation } from "react-i18next";
import type { FC } from 'react';

export const FrutasPage: FC = () => {
  const { t } = useTranslation();
  const { frutas = [], adicionarFruta, atualizarFruta, removerFruta } = useFrutas();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFruta, setEditingFruta] = useState<
    { dataVencimento: string; id: number; fruta: string; valor: string; status: 'Ativo' | 'Inativo'; image: string; descricao: string } 
    | undefined
  >();
  const [dialogExcluirOpen, setDialogExcluirOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedFruta, setSelectedFruta] = useState<Fruta | null>(null);
  const [frutaToDelete, setFrutaToDelete] = useState<Fruta | null>(null);
  const [dialogDetalhesOpen, setDialogDetalhesOpen] = useState(false);

  const filteredFrutas = frutas
    .filter(fruta => fruta?.fruta?.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(fruta => ({
      ...fruta,
      status: fruta.status || 'Ativo' as const,
      descricao: fruta.descricao || ""
    }));

  const handleSubmit = useCallback(({ fruta, valor, dataVencimento, status, descricao }: { 
    fruta: string; 
    valor: string; 
    dataVencimento?: string; 
    status?: 'Ativo' | 'Inativo';
    descricao?: string;
  }) => {
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'));

    if (fruta && !isNaN(valorNumerico)) {
      const frutaData = {
        fruta,
        valor: valorNumerico,
        status: status || 'Ativo',
        dataVencimento: dataVencimento ? new Date(dataVencimento) : new Date(),
        descricao: descricao || ''
      };

      if (editingFruta) {
        atualizarFruta(editingFruta.id, frutaData);
      } else {
        adicionarFruta(frutaData);
      }
      setEditingFruta(undefined);
      setIsFormOpen(false);
    }
  }, [adicionarFruta, atualizarFruta, editingFruta]);

  const handleEditClick = useCallback((id: number) => {
    const fruta = frutas.find(f => f.id === id);
    if (fruta) {
      setEditingFruta({
        id: fruta.id,
        fruta: fruta.fruta,
        valor: fruta.valor.toFixed(2).replace('.', ','),
        status: fruta.status || 'Ativo',
        dataVencimento: fruta.dataVencimento.toISOString().split("T")[0],
        image: fruta.image || "",
        descricao: fruta.descricao || ""
      });
      setIsFormOpen(true);
    }
  }, [frutas]);

  const handleDeleteClick = (id: number) => {
    const fruta = frutas.find(f => f.id === id);
    if (fruta) {
      setFrutaToDelete({
        ...fruta,
        status: fruta.status || 'Ativo' as const,
        descricao: fruta.descricao || ""
      });
      setSelectedId(id);
      setDialogExcluirOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      removerFruta(selectedId);
      setDialogExcluirOpen(false);
      setSelectedId(null);
      setFrutaToDelete(null);
    }
  };

  const handleDetailsClick = useCallback((id: number) => {
    const fruta = frutas.find(f => f.id === id);
    if (fruta) {
      setSelectedFruta({
        ...fruta,
        status: fruta.status || 'Ativo' as const,
        descricao: fruta.descricao || ""
      });
      setDialogDetalhesOpen(true);
    }
  }, [frutas]);

  const handleDetailsClose = () => {
    setSelectedId(null);
    setDialogDetalhesOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PrimarySearchAppBar color="secondary" />
      <Box 
      sx={{
        width: '80%',
        margin: 'auto',
        marginTop: '60px'
      }}>
        <Box
        sx={{
          display: 'flex',
          mb: 3,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'Roboto', color: '#616161' }}>{t('listaDeFrutas')}</Typography>
            <FrutaSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </Box>
          
          <Box sx={{ gap: 2 }}>
              <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setIsFormOpen(true)}
                  disabled={isFormOpen}
                color="secondary"
                sx={{
                  py: 1,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "primary.contrastText"
                }}
              >
                {t('adicionarFruta')}
              </Button>
            </Box>
      </Box>
      <Paper elevation={0} sx={{ height: "100%", p: 2, borderRadius: 2 }}>
        <FrutasTable
          frutas={filteredFrutas}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onDetails={handleDetailsClick}
          />
      </Paper>
      <FrutaForm
        open={isFormOpen || !!editingFruta}
        onClose={() => {
          setIsFormOpen(false);
            setEditingFruta(undefined);
          }}
          onSubmit={handleSubmit}
          title={editingFruta ? 'Editar Fruta' : 'Adicionar Fruta'}
          initialData={editingFruta}
        />

        {frutaToDelete && (
          <DialogExcluir
            open={dialogExcluirOpen}
            onClose={() => setDialogExcluirOpen(false)}
            onConfirm={handleConfirmDelete}
            fruta={frutaToDelete}
          />
        )}

        {selectedFruta && (
          <DialogDetalhes
            open={dialogDetalhesOpen}
            onClose={handleDetailsClose}
            fruta={selectedFruta}
          />
        )}
      </Box>
    </Box>
  );
}

export default FrutasPage;
