import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#833ab4',
    },
    secondary: {
      main: '#fcb045',
    },
    error: {
      main: '#fd1d1d',
    },
    background: {
      // default: '#0D0D0D',
    },
  },
  overrides: {
    MuiDivider: {
      root: {
        // backgroundColor: 'rgba(101 240 189 / 10%)',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'initial',
      }
    }
  },
});

export default theme;