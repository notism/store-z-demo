import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Prompt',
  },
  palette: {
    primary: {
      main: '#096FAE',
      // main: '#F7F7F7',
    },
    secondary: {
      main: '#0A517E',
    },
    action: {
      disabledBackground: 'white',
    },
  },
});

export { MuiThemeProvider, theme };