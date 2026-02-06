import { useQuery } from '@tanstack/react-query';
import { Scoreboard } from '../types/espn';
import { LeagueType } from '../store/leagueSlice';

const ESPN_API_BASE = 'https://site.api.espn.com/apis/site/v2/sports';

export const useScoreboard = (league: LeagueType) => {
  return useQuery<Scoreboard>({
    queryKey: ['scoreboard', league],
    queryFn: async () => {
      const sport = league === 'nba' ? 'basketball' : 'football';
      const url = `${ESPN_API_BASE}/${sport}/${league}/scoreboard`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch scoreboard: ${response.statusText}`);
      }
      
      return response.json();
    },
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Refetch every minute for live scores
  });
};
