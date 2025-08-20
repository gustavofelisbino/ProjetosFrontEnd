import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes';
import { FrutasProvider } from './contexts/FrutasContext';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <FrutasProvider>
          <AppRoutes />
        </FrutasProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
