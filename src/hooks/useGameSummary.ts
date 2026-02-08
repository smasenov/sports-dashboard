import { useQuery } from '@tanstack/react-query';
import { GameSummary } from '../types/espn';
import { LeagueType } from '../store/leagueSlice';

const ESPN_API_BASE = 'https://site.api.espn.com/apis/site/v2/sports';

export const useGameSummary = (league: LeagueType, gameId: string | null) => {
  return useQuery<GameSummary>({
    queryKey: ['gameSummary', league, gameId],
    queryFn: async () => {
      if (!gameId) {
        throw new Error('Game ID is required');
      }
      
      const sport = league === 'nba' ? 'basketball' : 'football';
      const url = `${ESPN_API_BASE}/${sport}/${league}/summary?event=${gameId}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch game summary: ${response.statusText}`);
      }
      
      return response.json();
    },
    enabled: !!gameId, // Only run query if gameId is provided
    staleTime: 30000, // 30 seconds
  });
};
