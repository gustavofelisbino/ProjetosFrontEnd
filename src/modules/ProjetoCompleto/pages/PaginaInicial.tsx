import { useState, useReducer, useEffect } from 'react';
import { useFrutas } from '../../../contexts/FrutasContext';
import { useCarrinho } from '../../../contexts/CarrinhoContext';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Contador } from '../components/Contador';
import { FrutasActions } from '../components/FrutasActions';
import { CarrinhoToggle } from '../components/CarrinhoToggle';
import { CarrinhoItens } from '../components/CarrinhoItens';
import { contadorReducer } from '../types';
import type { FC } from 'react';
import PrimarySearchAppBar from '../../../components/AppBar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const initialState = { count: 0 };

export const ProjetoCompletoPage: FC = () => {
    const { t } = useTranslation();
    const { frutas } = useFrutas();
    const [frutaAtual, setFrutaAtual] = useState(frutas[0]);
    const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
    const [state, dispatch] = useReducer(contadorReducer, initialState);
    const { limparCarrinho } = useCarrinho();
    const navigate = useNavigate();

  useEffect(() => {
    if (frutas.length > 0 && !frutaAtual) {
      setFrutaAtual(frutas[0]);
    }
  }, [frutas, frutaAtual]);

  const handleTrocarFruta = () => {
    if (frutaAtual && Array.isArray(frutas) && frutas.length > 0) {
      const currentIndex = frutas.findIndex((f) => f.id === frutaAtual.id);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % frutas.length;
        setFrutaAtual(frutas[nextIndex]);
      }
    }
  };

  const handleLimparCarrinho = () => {
    limparCarrinho();
    setMostrarCarrinho(false);
  };

  if (!frutaAtual) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">{t('carregandoFrutas')}</Typography>
      </Box>
    );
  }

  return (
    <>
    <PrimarySearchAppBar />
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '60%',
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'flex-end' }}>
          <CarrinhoToggle onToggle={() => setMostrarCarrinho(!mostrarCarrinho)} />
        </Box>

        <Contador state={state} dispatch={dispatch} />

        <Box sx={{ textAlign: 'center', width: '100%', }}>
          <Typography variant="h5" gutterBottom>
            {t('nomeDaFruta')}
          </Typography>
          <Typography variant="h5" color="primary.main" sx={{ mt: 1, mb: 2  }}>
            {frutaAtual.fruta}
          </Typography>
          {frutaAtual.descricao && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {t('descricao')} {frutaAtual.descricao}
            </Typography>
          )}
          <FrutasActions frutaAtual={frutaAtual} onTrocar={handleTrocarFruta} />
        </Box>

        <CarrinhoItens mostrar={mostrarCarrinho} />

        {mostrarCarrinho && (
          <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
            <Button 
              variant="contained"
              onClick={handleLimparCarrinho}
              sx={{ 
                bgcolor: 'error.main', 
                '&:hover': { bgcolor: 'error.dark' },
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              {t('limparcarrinho')}
            </Button>
          </Box>
        )}
        <Button variant="contained" onClick={() => navigate('/')}>Voltar</Button>
      </Paper>
    </Box>
    </>
  );
};

export default ProjetoCompletoPage;
