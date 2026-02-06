import { useQuery } from '@tanstack/react-query';
import { Team } from '../types/espn';
import { LeagueType } from '../store/leagueSlice';

const ESPN_API_BASE = 'https://site.api.espn.com/apis/site/v2/sports';

interface TeamDetailResponse {
  team: Team;
}

export const useTeamDetail = (league: LeagueType, teamId: string | null) => {
  return useQuery<Team>({
    queryKey: ['teamDetail', league, teamId],
    queryFn: async () => {
      if (!teamId) {
        throw new Error('Team ID is required');
      }
      
      const sport = league === 'nba' ? 'basketball' : 'football';
      const url = `${ESPN_API_BASE}/${sport}/${league}/teams/${teamId}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch team details: ${response.statusText}`);
      }
      
      const data: TeamDetailResponse = await response.json();
      return data.team;
    },
    enabled: !!teamId,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
