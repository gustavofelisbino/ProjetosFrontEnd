import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            dark: '#1565c0',
            light: '#42a5f5',
            contrastText: '#fff',
        },
        secondary: {
            main: '#dc004e',
            dark: '#c2003f',
            light: '#ff5252',
            contrastText: '#fff',
        },
        background: {
            default: '#f7f6f3',
            paper: '#fffffff',
        },
    },
});
