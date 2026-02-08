import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,      // Extra small devices (phones, 0px and up)
        sm: 600,    // Small devices (tablets, 600px and up)
        md: 960,    // Medium devices (desktops, 960px and up)
        lg: 1280,   // Large devices (large desktops, 1280px and up)
        xl: 1920,   // Extra large devices (extra large desktops, 1920px and up)
      },
    },
    palette: {
      primary: {
        main: '#1976d2',
      },
      background: {
        default: '#f5f5f5',
      },
    },
    typography: {
      // Responsive font sizes
      h1: {
        fontSize: '2.5rem',
        '@media (min-width:600px)': {
          fontSize: '3rem',
        },
        '@media (min-width:960px)': {
          fontSize: '3.5rem',
        },
      },
      h2: {
        fontSize: '2rem',
        '@media (min-width:600px)': {
          fontSize: '2.5rem',
        },
        '@media (min-width:960px)': {
          fontSize: '3rem',
        },
      },
      h3: {
        fontSize: '1.75rem',
        '@media (min-width:600px)': {
          fontSize: '2rem',
        },
        '@media (min-width:960px)': {
          fontSize: '2.25rem',
        },
      },
      h4: {
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
          fontSize: '1.75rem',
        },
        '@media (min-width:960px)': {
          fontSize: '2rem',
        },
      },
      h5: {
        fontSize: '1.25rem',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      h6: {
        fontSize: '1rem',
        '@media (min-width:600px)': {
          fontSize: '1.125rem',
        },
      },
    },
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        },
      },
    },
  });