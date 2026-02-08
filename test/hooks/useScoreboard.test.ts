/// <reference types="jest" />
/// <reference types="node" />

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useScoreboard } from '../../src/hooks/useScoreboard';
import { mockScoreboardResponse } from '../utils/mockData';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  );
};

describe('useScoreboard', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch scoreboard data successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockScoreboardResponse,
    });

    const { result } = renderHook(() => useScoreboard('nba'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockScoreboardResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'
    );
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => useScoreboard('nba'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeTruthy();
  });

  it('should use correct URL for NFL', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockScoreboardResponse,
    });

    renderHook(() => useScoreboard('nfl'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
      );
    });
  });
});
