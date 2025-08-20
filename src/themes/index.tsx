import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      primary: {
        main: "#843ab5",
      },
      secondary: {
        main: "#1976d2",
      },
      success: {
        main: "#4caf50",
      },
      error: {
        main: "#f44336",
      },
      warning: {
        main: "#ff9800",
      },
      grey: {
        500: "#9e9e9e",
        300: "#e6e6e6",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h6: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      body2: {
        fontSize: "0.875rem",
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
