import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes';
import { AppRoutes } from './routes';
import { FrutasProvider } from './contexts/FrutasContext';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import ErrorBoundary from './components/ErrorBoundary';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <BrowserRouter>
          <FrutasProvider>
            <CarrinhoProvider>
              <AppRoutes />
            </CarrinhoProvider>
          </FrutasProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
