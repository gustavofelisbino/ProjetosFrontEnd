import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, InputAdornment, Paper, 
  FormControl, InputLabel, Select, MenuItem, FormHelperText 
} from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';

type FormData = {
  fruta: string;
  dataVencimento: string;
  valor: string;
  status: 'Ativo' | 'Inativo';
  descricao: string;
};

const frutaSchema = yup.object({
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
    }),
  status: yup.mixed<'Ativo' | 'Inativo'>()
    .oneOf(['Ativo', 'Inativo'] as const, 'Status inválido')
    .required('O status é obrigatório'),
  descricao: yup.string()
    .min(5, 'A descrição deve ter pelo menos 5 caracteres')
    .max(100, 'A descrição não pode ter mais de 100 caracteres')
    
});

interface FrutaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  title: string;
  descricao?: string;
}

export function FrutaForm({ open, onClose, onSubmit, initialData, title }: FrutaFormProps) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(frutaSchema) as any,
    defaultValues: {
      fruta: '',
      dataVencimento: new Date().toISOString().split('T')[0],
      valor: '',
      status: 'Ativo' as const,
      descricao: ''
    },
    mode: 'onChange'
  });

  useEffect(() => {
    reset(initialData || { 
      fruta: '', 
      dataVencimento: new Date().toISOString().split('T')[0],
      valor: '', 
      status: 'Ativo', 
      descricao: ''
    });
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

  const handleFormSubmit = (data: any) => {
    onSubmit(data as FormData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Paper 
        component="form" 
        onSubmit={handleSubmit(handleFormSubmit)} 
        sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '400px', padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
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
                    helperText={errors.fruta?.message as string}
                  />
                )}
              />
              <Controller
                name="dataVencimento"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Data de Vencimento"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                )}
              />
            </Box>
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
                  helperText={errors.valor?.message as string}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    inputMode: 'numeric'
                  }}
                />
              )}
            />
            
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    {...field}
                    label="Status"
                    value={field.value || 'Ativo'}
                    onChange={(e) => field.onChange(e.target.value as 'Ativo' | 'Inativo')}
                  >
                    <MenuItem value="Ativo">Disponível</MenuItem>
                    <MenuItem value="Inativo">Indisponível</MenuItem>
                  </Select>
                  {errors.status && (
                    <FormHelperText>{errors.status.message as string}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="descricao"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descrição"
                  margin="normal"
                  fullWidth
                  error={!!errors.descricao}
                  helperText={errors.descricao?.message as string}
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
