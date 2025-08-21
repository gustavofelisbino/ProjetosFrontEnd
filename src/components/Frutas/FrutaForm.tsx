import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, InputAdornment, Paper 
} from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';

type FormData = {
  fruta: string;
  valor: string;
};

const frutaSchema = yup.object().shape({
  fruta: yup.string()
    .required('O nome da fruta é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(50, 'O nome não pode ter mais de 50 caracteres'),
  valor: yup.string()
    .required('O valor é obrigatório')
    .test('valor-valido', 'Valor inválido', (value) => {
      if (!value) return false;
      const numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
      return !isNaN(numericValue) && numericValue > 0;
    })
});

interface FrutaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { fruta: string; valor: string }) => void;
  initialData?: { fruta: string; valor: string };
  title: string;
}

export function FrutaForm({ open, onClose, onSubmit, initialData, title }: FrutaFormProps) {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(frutaSchema),
    defaultValues: initialData || { fruta: '', valor: '' },
    mode: 'onChange'
  });

  useEffect(() => {
    reset(initialData || { fruta: '', valor: '' });
  }, [initialData, open, reset]);

  const formatCurrencyDisplay = (value: string): string => {
    if (!value) return '';
    const number = parseInt(value, 10) / 100;
    if (isNaN(number)) return '';
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (value: string) => void
  ) => {
    const { value } = e.target;
    const onlyNums = value.replace(/\D/g, '');
    const formattedValue = formatCurrencyDisplay(onlyNums);
    onChange(formattedValue);
  };

  const onSubmitForm = (data: FormData) => {
    onSubmit({
      fruta: data.fruta,
      valor: formatCurrencyDisplay(data.valor)
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Paper 
        component="form" 
        onSubmit={handleSubmit(onSubmitForm)} 
        sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '400px', padding: 2 }}>
            <Controller
              name="fruta"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome da Fruta"
                  fullWidth
                  margin="normal"
                  error={!!errors.fruta}
                  helperText={errors.fruta?.message}
                />
              )}
            />
            <Controller
              name="valor"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <TextField
                  {...field}
                  value={value || ''}
                  onChange={(e) => handleValueChange(e, onChange)}
                  label="Valor"
                  placeholder="0,00"
                  fullWidth
                  error={!!errors.valor}
                  helperText={errors.valor?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    inputMode: 'numeric'
                  }}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}
