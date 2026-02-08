import { Refine } from '@refinedev/core';
import { RefineSnackbarProvider } from '@refinedev/mui';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import routerBindings from '@refinedev/react-router-v6';

import { store } from './store/store';
import { dataProvider } from './providers/dataProvider';
import { resources, routes } from './config';
import { theme } from './theme/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
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
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  disableTelemetry: true,
                }}
              >
                <Routes>
                  {routes}
                </Routes>
              </Refine>
            </RefineSnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
