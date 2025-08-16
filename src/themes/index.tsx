import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#843ab5',
            dark: '#6a219c',
            light: '#c2003f',
            contrastText: '#fff',
        },
        secondary: {
            main: '#eeeeee',
            dark: '#c2003f',
            light: '#ff5252',
            contrastText: '#000',
        },
        background: {
            default: '#ffffff',
            paper: '#fffffff',
        },
    },
});

export default Theme;
