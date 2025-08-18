import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { useFrutas } from '../../contexts/FrutasContext';
import { FrutaForm } from '../../components/Frutas/FrutaForm';
import { FrutaList } from '../../components/Frutas/FrutaList';
import { FrutaSearch } from '../../components/Frutas/FrutaSearch';
import PrimarySearchAppBar from "../../components/AppBar";

export default function FrutasPage() {
  const { frutas = [], adicionarFruta, atualizarFruta, removerFruta } = useFrutas();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFruta, setEditingFruta] = useState<{ id: number; fruta: string; valor: string } | undefined>();

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
      adicionarFruta({
        fruta,
        valor: valorNumerico
      });
    }
  }, [adicionarFruta]);

  const handleEditFruta = useCallback(({ fruta, valor }: { fruta: string; valor: string }) => {
    if (!editingFruta) return;
    
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
    if (fruta && !isNaN(valorNumerico)) {
      atualizarFruta(editingFruta.id, {
        fruta,
        valor: valorNumerico
      });
    }
    setEditingFruta(undefined);
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
    if (window.confirm('Tem certeza que deseja remover esta fruta?')) {
      removerFruta(id);
    }
  }, [removerFruta]);

  return (
    <>
      <PrimarySearchAppBar />
      <Box sx={{ width: '60%', margin: 'auto', marginTop: '80px', fontFamily: 'Roboto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center'}}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>Lista de Frutas</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FrutaSearch 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
            <Button
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setIsFormOpen(true)}
            >
              Adicionar Fruta
            </Button>
          </Box>
        </Box>

        <FrutaList 
          frutas={filteredFrutas}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          loading={false}
        />

        <FrutaForm
          open={isFormOpen || !!editingFruta}
          onClose={() => {
            setIsFormOpen(false);
            setEditingFruta(undefined);
          }}
          onSubmit={editingFruta ? handleEditFruta : handleAddFruta}
          initialData={editingFruta}
          title={editingFruta ? 'Editar Fruta' : 'Adicionar Fruta'}
        />
      </Box>
    </>
  );
}