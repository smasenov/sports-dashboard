import { CssBaseline, GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { Scoreboard } from './pages/Scoreboard';
import { Teams } from './pages/Teams';
import { Dashboard } from './pages/Dashboard';
import { Layout } from './components/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                html: { WebkitFontSmoothing: 'auto' },
              }}
            />
            <Layout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/scoreboard" element={<Scoreboard />} />
                <Route path="/teams" element={<Teams />} />
              </Routes>
            </Layout>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
