import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, InputAdornment, Paper, 
  FormControl, Select, MenuItem, FormHelperText,
  Card, CardContent 
} from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import type { FC } from "react";
import { useTranslation } from 'react-i18next';

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
    dataVencimento: yup.string()
    .required('A data de vencimento é obrigatória')
    .test('data-valida', 'Data inválida', (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
  status: yup.mixed<'Ativo' | 'Inativo'>()
    .oneOf(['Ativo', 'Inativo'] as const, 'Status inválido')
    .required('O status é obrigatório'),
  descricao: yup.string()
});

interface FrutaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  title: string;
}

export const FrutaForm: FC<FrutaFormProps> = ({ open, onClose, onSubmit, initialData, title }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(frutaSchema) as any,
    defaultValues: {
      fruta: '',
      dataVencimento: new Date().toISOString().split('T')[0],
      valor: '',
      status: 'Ativo',
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

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <Paper 
        component="form" 
        onSubmit={handleSubmit(handleFormSubmit)} 
        sx={{ p: 0, bgcolor: 'background.default', borderRadius: 2 }}
      >
        <DialogTitle sx={{ fontSize: 26 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddCircleIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            {title}
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Card sx={{ p: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '400px', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 3, width: '100%' }}>
                  <Controller
                    name="fruta"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t('nomeDaFruta')}
                        fullWidth
                        margin="normal"
                        error={!!errors.fruta}
                        helperText={errors.fruta?.message}
                        variant="standard"
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
                        variant="standard"
                        label={t('dataDeVencimento')}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        error={!!errors.dataVencimento}
                        helperText={errors.dataVencimento?.message}
                      />
                    )}
                  />
                </Box>
              </Box>

              <Controller
                name="valor"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    value={value || ''}
                    onChange={(e) => handleValueChange(e, onChange)}
                    label={t('valor')}
                    placeholder="0,00"
                    fullWidth
                    variant="standard"
                    error={!!errors.valor}
                    helperText={errors.valor?.message}
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
                    <Select
                      {...field}
                      label={t('status')}
                      variant="standard"
                      value={field.value || 'Ativo'}
                      onChange={(e) => field.onChange(e.target.value as 'Ativo' | 'Inativo')}
                      sx={{ mt: 2 }}
                    >
                      <MenuItem value="Ativo">{t('disponivel')}</MenuItem>
                      <MenuItem value="Inativo">{t('indisponivel')}</MenuItem>
                    </Select>
                    {errors.status && (
                      <FormHelperText>{errors.status.message}</FormHelperText>
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
                    label={t('descricao')}
                    margin="normal"
                    fullWidth
                    variant="standard"
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                  />
                )}
              />
            </CardContent>
          </Card>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button type="button" onClick={onClose}>
            {t('cancelar')}
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {t('salvar')}
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default FrutaForm;
