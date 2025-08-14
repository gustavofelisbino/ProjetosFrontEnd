import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './themes';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};
