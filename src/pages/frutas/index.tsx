import { Box, Button, Typography, Paper } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { useFrutas } from '../../contexts/FrutasContext';
import { FrutaForm } from '../../components/Frutas/FrutaForm';
import FrutaSearch from '../../components/Frutas/FrutaSearch';
import FrutasTable from '../../components/Tabela';
import PrimarySearchAppBar from "../../components/AppBar";
import { DialogExcluir } from '../../components/Dialog/DialogExcluir';

export default function FrutasPage() {
  const { frutas = [], adicionarFruta, atualizarFruta, removerFruta } = useFrutas();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFruta, setEditingFruta] = useState<{ id: number; fruta: string; valor: string } | undefined>();
  const [dialogExcluirOpen, setDialogExcluirOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredFrutas = (Array.isArray(frutas) ? frutas : [])
    .filter(fruta => {
      if (!fruta || typeof fruta !== 'object') return false;
      const search = (searchTerm || '').trim().toLowerCase();
      return fruta.fruta && fruta.fruta.toLowerCase().includes(search);
    })
    .map(fruta => ({
      id: fruta.id || 0,
      fruta: fruta.fruta || '',
      valor: typeof fruta.valor === 'number' ? fruta.valor : 0
    }));

  const handleAddFruta = useCallback(({ fruta, valor }: { fruta: string; valor: string }) => {
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
    if (fruta && !isNaN(valorNumerico)) {
      if (editingFruta) {
        atualizarFruta(editingFruta.id, {
          fruta,
          valor: valorNumerico
        });
      } else {
        adicionarFruta({
          fruta,
          valor: valorNumerico
        });
      }
      setEditingFruta(undefined);
      setIsFormOpen(false);
    }
  }, [adicionarFruta, atualizarFruta, editingFruta]);

  const handleEditFruta = useCallback(({ fruta, valor }: { fruta: string; valor: string }) => {
    if (!editingFruta) return;
    
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
    if (fruta && !isNaN(valorNumerico)) {
      atualizarFruta(editingFruta.id, {
        fruta,
        valor: valorNumerico
      });
      setEditingFruta(undefined);
      setIsFormOpen(false);
    }
  }, [editingFruta, atualizarFruta]);

  const handleEditClick = useCallback((id: number) => {
    const frutaToEdit = frutas.find(fruta => fruta.id === id);
    if (frutaToEdit) {
      setEditingFruta({
        id: frutaToEdit.id,
        fruta: frutaToEdit.fruta,
        valor: frutaToEdit.valor.toFixed(2).replace('.', ',')
      });
    }
  }, [frutas]);

  const handleDeleteClick = useCallback((id: number) => {
    setDialogExcluirOpen(true);
    setSelectedId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedId !== null) {
      removerFruta(selectedId);
      setDialogExcluirOpen(false);
      setSelectedId(null);
    }
  }, [removerFruta, selectedId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PrimarySearchAppBar color="secondary" />
      <Box sx={{ width: '60%', margin: 'auto', marginTop: '80px', fontFamily: 'Roboto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold'}}>Lista de Frutas</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FrutaSearch
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
              />
              <Button
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => setIsFormOpen(true)}
                disabled={isFormOpen}
                sx={{ whiteSpace: 'nowrap' }}
                color="secondary"
              >
                Adicionar Fruta
              </Button>
            </Box>
        </Box>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <FrutasTable 
            frutas={filteredFrutas.map(fruta => ({
              ...fruta,
              status: 'Ativo'
            }))}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onDetails={() => {}}
          />
        </Paper>

        <FrutaForm
          open={isFormOpen || !!editingFruta}
          onClose={() => {
            setIsFormOpen(false);
            setEditingFruta(undefined);
          }}
          onSubmit={editingFruta ? handleEditFruta : handleAddFruta}
          title={editingFruta ? 'Editar Fruta' : 'Adicionar Fruta'}
          initialData={editingFruta}
        />
        <DialogExcluir
          open={dialogExcluirOpen}
          onClose={() => setDialogExcluirOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </Box>
    </Box>
  );
}