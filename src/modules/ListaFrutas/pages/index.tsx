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

export default function FrutasPage() {
  const { frutas = [], adicionarFruta, atualizarFruta, removerFruta } = useFrutas();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFruta, setEditingFruta] = useState<{ id: number; fruta: string; valor: string; status: 'Ativo' | 'Inativo'; image: string } | undefined>();
  const [dialogExcluirOpen, setDialogExcluirOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedFruta, setSelectedFruta] = useState<Fruta | null>(null);
  const [dialogDetalhesOpen, setDialogDetalhesOpen] = useState(false);

  const filteredFrutas = (Array.isArray(frutas) ? frutas : [])
    .filter(fruta => {
      if (!fruta || typeof fruta !== 'object') return false;
      const search = (searchTerm || '').trim().toLowerCase();
      return fruta.fruta && fruta.fruta.toLowerCase().includes(search);
    })
    .map(fruta => ({
      id: fruta.id || 0,
      fruta: fruta.fruta || '',
      valor: typeof fruta.valor === 'number' ? fruta.valor : 0,
      status: fruta.status || 'Ativo',
      image: fruta.image || ''
    }));

  const handleAddFruta = useCallback(({ fruta, valor, status = 'Ativo' }: { fruta: string; valor: string; status?: 'Ativo' | 'Inativo' }) => {
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
    if (fruta && !isNaN(valorNumerico)) {
      if (editingFruta) {
        atualizarFruta(editingFruta.id, {
          fruta,
          valor: valorNumerico,
          status: status || 'Ativo',
          image: editingFruta.image || `https://source.unsplash.com/random/100x100/?fruit=${fruta.toLowerCase().replace(/\s+/g, '')}`
        });
      } else {
        adicionarFruta({
          fruta,
          valor: valorNumerico,
          status: status || 'Ativo',
          image: `https://source.unsplash.com/random/100x100/?fruit=${fruta.toLowerCase().replace(/\s+/g, '')}`
        });
      }
      setEditingFruta(undefined);
      setIsFormOpen(false);
    }
  }, [adicionarFruta, atualizarFruta, editingFruta]);

  const handleEditFruta = useCallback(({ fruta, valor, status = 'Ativo' }: { fruta: string; valor: string; status?: 'Ativo' | 'Inativo' }) => {
    if (!editingFruta) return;
    
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
    if (fruta && !isNaN(valorNumerico)) {
      handleAddFruta({ fruta, valor, status });
    }
  }, [editingFruta, handleAddFruta]);

  const handleEditClick = useCallback((id: number) => {
    const fruta = frutas.find(f => f.id === id);
    if (fruta) {
      setEditingFruta({
        id: fruta.id,
        fruta: fruta.fruta,
        valor: fruta.valor.toString(),
        status: fruta.status || 'Ativo',
        image: fruta.image
      });
      setIsFormOpen(true);
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

  const handleDetailsClick = useCallback((id: number) => {
    const fruta = frutas.find(f => f.id === id);
    if (fruta) {
      setSelectedFruta({
        id: fruta.id,
        fruta: fruta.fruta,
        valor: fruta.valor,
        status: fruta.status || 'Ativo',
        image: fruta.image
      });
      setDialogDetalhesOpen(true);
    }
  }, [frutas]);

  const handleDetailsClose = useCallback(() => {
    setSelectedId(null);
    setDialogDetalhesOpen(false);
  }, []);

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
            onDetails={handleDetailsClick}
          />
        </Paper>

        <FrutaForm
          open={isFormOpen || !!editingFruta}
          onClose={() => {
            setIsFormOpen(false);
            setEditingFruta(undefined);
            setDialogDetalhesOpen(false);
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