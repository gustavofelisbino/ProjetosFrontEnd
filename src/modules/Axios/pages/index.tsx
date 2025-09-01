import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { Add as AddIcon, Numbers as NumberIcon } from '@mui/icons-material';
import { alpha } from "@mui/material/styles";
import FrutasTable from '../../../components/Tabela';
import PrimarySearchAppBar from "../../../components/AppBar";
import { DialogExcluir } from '../../../components/Dialog/DialogExcluir';
import { FrutaForm } from '../../../modules/ListaFrutas/components/FrutaForm';
import theme from "../../../themes";
import { useTranslation } from "react-i18next";

import { getFrutas, addFruta, updateFruta, deleteFruta } from '../../../api/frutas';
import type { Fruta as ApiFruta } from '../../../api/frutas';
import type { Fruta as TableFruta } from '../../../components/Tabela';

const toTableFruta = (fruta: ApiFruta): TableFruta => ({
  id: fruta.id!,
  fruta: fruta.fruta,
  valor: Number(fruta.valor),
  dataVencimento: new Date(fruta.dataVencimento),
  status: fruta.status || 'Ativo',
  descricao: fruta.descricao || ''
});

const toApiFruta = (fruta: Omit<TableFruta, 'id'> & { id?: number }): ApiFruta => ({
  id: fruta.id,
  fruta: fruta.fruta,
  valor: fruta.valor,
  dataVencimento: fruta.dataVencimento.toISOString().split('T')[0],
  status: fruta.status,
  descricao: fruta.descricao
});

type FormData = {
  fruta: string;
  valor: string;
  dataVencimento?: string;
  status?: 'Ativo' | 'Inativo';
  descricao?: string;
};

export default function FrutasPage() {
  const { t } = useTranslation();

  const [frutas, setFrutas] = useState<TableFruta[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFruta, setEditingFruta] = useState<TableFruta | null>(null);
  const [dialogExcluirOpen, setDialogExcluirOpen] = useState(false);
  const [selectedFruta, setSelectedFruta] = useState<TableFruta | null>(null);

  const loadFrutas = async () => {
    try {
      const data = await getFrutas();
      setFrutas(data.map(toTableFruta));
    } catch (error) {
      console.error('Error loading frutas:', error);
    }
  };

  useEffect(() => {
    loadFrutas();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      const frutaData: Omit<TableFruta, 'id'> = {
        fruta: formData.fruta,
        valor: parseFloat(formData.valor.replace(',', '.')),
        dataVencimento: formData.dataVencimento ? new Date(formData.dataVencimento) : new Date(),
        status: formData.status || 'Ativo',
        descricao: formData.descricao || ''
      };

      if (editingFruta) {
        const apiFruta = toApiFruta({ ...frutaData, id: editingFruta.id });
        await updateFruta(editingFruta.id, apiFruta);
        setFrutas(prev =>
          prev.map(f => f.id === editingFruta.id ? toTableFruta(apiFruta) : f)
        );
      } else {
        const apiFruta = toApiFruta(frutaData);
        const newFruta = await addFruta(apiFruta);
        setFrutas(prev => [...prev, toTableFruta(newFruta)]);
      }

      setIsFormOpen(false);
      setEditingFruta(null);
    } catch (error) {
      console.error('Error saving fruta:', error);
    }
  };

  const handleEditClick = (id: number) => {
    const fruta = frutas.find(f => f.id === id);
    if (fruta) {
      setEditingFruta({
        ...fruta,
        valor: fruta.valor,
        dataVencimento: fruta.dataVencimento
      });
      setIsFormOpen(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    const fruta = frutas.find(f => f.id === id);
    if (fruta) {
      setSelectedFruta(fruta);
      setDialogExcluirOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedFruta) {
      try {
        await deleteFruta(selectedFruta.id!);
        setFrutas(prev => prev.filter(f => f.id !== selectedFruta.id));
      } catch (error) {
        console.error('Error deleting fruta:', error);
      } finally {
        setDialogExcluirOpen(false);
        setSelectedFruta(null);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PrimarySearchAppBar />
      <Box sx={{ width: '80%', margin: 'auto', marginTop: '60px' }}>
        <Box sx={{ display: 'flex', mb: 3, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" fontWeight="bold" color="#616161">{t('listaDeFrutas')}</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingFruta(null);
              setIsFormOpen(true);
            }}
          >
            {t('adicionarFruta')}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Card sx={{ width: '30%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <NumberIcon sx={{ 
                padding: 1, fontSize: 32, color: '#616161',
                backgroundColor: alpha(theme.palette.primary.dark, 0.3),
                borderRadius: 2
              }} />
              <Box>
                <Typography variant="h6" color="textSecondary">{t('totalDeFrutas')}</Typography>
                <Typography variant="h5">{frutas.length}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <FrutasTable
          frutas={frutas}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onDetails={(id) => console.log('Detalhes fruta', id)}
        />

        <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editingFruta ? t('editarFruta') : t('adicionarFruta')}</DialogTitle>
          <DialogContent>
            <FrutaForm
              open={isFormOpen || !!editingFruta}
              onClose={() => { 
                setIsFormOpen(false); 
                setEditingFruta(null); 
              }}
              onSubmit={handleSubmit}
              title={editingFruta ? t('editarFruta') : t('adicionarFruta')}
              initialData={
                editingFruta
                  ? {
                      ...editingFruta,
                      valor: editingFruta.valor.toFixed(2).replace('.', ','),
                      dataVencimento: editingFruta.dataVencimento.toISOString().split('T')[0],
                      status: editingFruta.status,
                      descricao: editingFruta.descricao || ''
                    }
                  : undefined
              }
            />
          </DialogContent>
        </Dialog>

        {selectedFruta && (
          <DialogExcluir
            open={dialogExcluirOpen}
            onClose={() => setDialogExcluirOpen(false)}
            onConfirm={handleConfirmDelete}
            fruta={selectedFruta}
          />
        )}
      </Box>
    </Box>
  );
}
