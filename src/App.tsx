import { Refine } from '@refinedev/core';
import { RefineSnackbarProvider } from '@refinedev/mui';
import { CssBaseline, GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import routerBindings, { NavigateToResource } from '@refinedev/react-router-v6';

import { store } from './store/store';
import { dataProvider } from './providers/dataProvider';
import { Scoreboard } from './pages/Scoreboard';
import { Teams } from './pages/Teams';
import { Dashboard } from './pages/Dashboard';
import { Layout } from './components/Layout';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const theme = createTheme({
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

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                html: { WebkitFontSmoothing: 'auto' },
              }}
            />
            <RefineSnackbarProvider>
              <Refine
                routerProvider={routerBindings}
                dataProvider={dataProvider}
                resources={[
                  {
                    name: 'dashboard',
                    list: '/',
                    meta: {
                      label: 'Dashboard',
                      icon: <DashboardIcon />,
                    },
                  },
                  {
                    name: 'scoreboard',
                    list: '/scoreboard',
                    meta: {
                      label: 'Scoreboard',
                      icon: <SportsBasketballIcon />,
                    },
                  },
                  {
                    name: 'teams',
                    list: '/teams',
                    meta: {
                      label: 'Teams',
                      icon: <GroupsIcon />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  disableTelemetry: true,
                }}
              >
                <Layout>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="scoreboard" element={<Scoreboard />} />
                    <Route path="teams" element={<Teams />} />
                    <Route path="*" element={<NavigateToResource />} />
                  </Routes>
                </Layout>
              </Refine>
            </RefineSnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;