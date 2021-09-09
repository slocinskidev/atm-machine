import { createTheme, Theme } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

export const lightTheme: Theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: blue[700],
    },
    secondary: {
      main: red[400],
    },
  },
});

export const darkTheme: Theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: red[400],
    },
    secondary: {
      main: blue[700],
    },
  },
});
