import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, InputAdornment, Paper } from "@mui/material";
import { useState, useEffect } from 'react';

interface FrutaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { fruta: string; valor: string }) => void;
  initialData?: { fruta: string; valor: string };
  title: string;
}

export function FrutaForm({ open, onClose, onSubmit, initialData, title }: FrutaFormProps) {
  const [fruta, setFruta] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    if (initialData) {
      setFruta(initialData.fruta);
      setValor(initialData.valor);
    } else {
      setFruta('');
      setValor('');
    }
  }, [initialData, open]);

  const formatCurrencyInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    
    const number = Number(numbers) / 100;
    if (isNaN(number)) return '';
    
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleSubmit = () => {
    onSubmit({ fruta, valor });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '400px', padding: 2 }}>
          <TextField
            label="Nome da Fruta"
            value={fruta}
            onChange={(e) => setFruta(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box sx={{ mt: 2, mb: 1 }}>
            <TextField
              label="Valor"
              value={valor}
              onChange={(e) => {
                const formatted = formatCurrencyInput(e.target.value);
                setValor(formatted);
              }}
              placeholder="0,00"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                inputMode: 'decimal'
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Salvar
        </Button>
      </DialogActions>
      </Paper>
    </Dialog>
  );
}
