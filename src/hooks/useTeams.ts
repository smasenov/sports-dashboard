import { useQuery } from '@tanstack/react-query';
import { TeamsResponse, Team } from '../types/espn';
import { LeagueType } from '../store/leagueSlice';

const ESPN_API_BASE = 'https://site.api.espn.com/apis/site/v2/sports';

export const useTeams = (league: LeagueType) => {
  return useQuery<Team[]>({
    queryKey: ['teams', league],
    queryFn: async () => {
      const sport = league === 'nba' ? 'basketball' : 'football';
      const url = `${ESPN_API_BASE}/${sport}/${league}/teams?limit=100`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch teams: ${response.statusText}`);
      }
      
      const data: TeamsResponse = await response.json();
      
      // Extract teams from the nested structure
      const teams: Team[] = [];
      data.sports?.forEach(sport => {
        sport.leagues?.forEach(league => {
          league.teams?.forEach(teamItem => {
            teams.push(teamItem.team);
          });
        });
      });
      
      return teams;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (teams don't change often)
  });
};
