import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes';
import { AppRoutes } from './routes';
import { FrutasProvider } from './contexts/FrutasContext';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import ErrorBoundary from './components/ErrorBoundary';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <BrowserRouter>
          <FrutasProvider>
            <CarrinhoProvider>
              <AppRoutes />
            </CarrinhoProvider>
          </FrutasProvider>
        </BrowserRouter>
      </ErrorBoundary>
      </I18nextProvider>
    </ThemeProvider>
  );
};
