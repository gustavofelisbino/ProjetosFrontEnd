import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './themes';
import { FrutasProvider } from './contexts/FrutasContext';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <FrutasProvider>
          <AppRoutes />
        </FrutasProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
