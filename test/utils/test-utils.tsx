import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import leagueReducer from '../../src/store/leagueSlice';
import { theme } from '../../src/theme/theme';

/* eslint-disable react-refresh/only-export-components */

// Create a test store
export const createTestStore = (preloadedState?: Partial<ReturnType<typeof configureStore>['getState']>) => {
  return configureStore({
    reducer: {
      league: leagueReducer,
    },
    preloadedState,
  });
};

// Create a test query client
export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0, // Renamed from cacheTime in React Query v5
      },
    },
  });
};

interface AllProvidersProps {
  children: React.ReactNode;
  store?: ReturnType<typeof createTestStore>;
  queryClient?: QueryClient;
}

// All providers wrapper for testing
export const AllProviders = ({ 
  children, 
  store = createTestStore(),
  queryClient = createTestQueryClient(),
}: AllProvidersProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

// Custom render function
export const renderWithProviders = (
  ui: ReactElement,
  {
    store = createTestStore(),
    queryClient = createTestQueryClient(),
    ...renderOptions
  }: {
    store?: ReturnType<typeof createTestStore>;
    queryClient?: QueryClient;
  } & Omit<RenderOptions, 'wrapper'> = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllProviders store={store} queryClient={queryClient}>
      {children}
    </AllProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { renderWithProviders as render };
