import { DataProvider } from '@refinedev/core';
import { LeagueType } from '../store/leagueSlice';

const API_URL = 'https://site.api.espn.com/apis/site/v2/sports';

// Helper function to convert LeagueType to full API path
const getLeaguePath = (league: LeagueType): string => {
  const sport = league === 'nba' ? 'basketball' : 'football';
  return `${sport}/${league}`;
};

export const dataProvider: DataProvider = {
  getApiUrl: () => API_URL,

  // Get list of resources (games or teams)
  getList: async ({ resource, meta }) => {
    const { league = 'nba' as LeagueType } = meta || {};
    const leaguePath = getLeaguePath(league);
    
    if (resource === 'games') {
      const response = await fetch(`${API_URL}/${leaguePath}/scoreboard`);
      const data = await response.json();
      
      return {
        data: data.events || [],
        total: data.events?.length || 0,
      };
    }
    
    if (resource === 'teams') {
      const response = await fetch(`${API_URL}/${leaguePath}/teams`);
      const data = await response.json();
      
      return {
        data: data.sports?.[0]?.leagues?.[0]?.teams || [],
        total: data.sports?.[0]?.leagues?.[0]?.teams?.length || 0,
      };
    }

    return {
      data: [],
      total: 0,
    };
  },

  // Get one resource (game or team)
  getOne: async ({ resource, id, meta }) => {
    const { league = 'nba' as LeagueType } = meta || {};
    const leaguePath = getLeaguePath(league);
    
    if (resource === 'games') {
      const response = await fetch(`${API_URL}/${leaguePath}/summary?event=${id}`);
      const data = await response.json();
      
      return {
        data,
      };
    }
    
    if (resource === 'teams') {
      const response = await fetch(`${API_URL}/${leaguePath}/teams/${id}`);
      const data = await response.json();
      
      return {
        data: data.team,
      };
    }

    return {
      data: {},
    };
  },

  // ESPN API is read-only, so these methods will throw errors
  create: async () => {
    throw new Error('ESPN API does not support create operations');
  },

  update: async () => {
    throw new Error('ESPN API does not support update operations');
  },

  deleteOne: async () => {
    throw new Error('ESPN API does not support delete operations');
  },

  // Optional: Get many resources at once
  getMany: async ({ resource, ids, meta }) => {
    const { league = 'nba' as LeagueType } = meta || {};
    const leaguePath = getLeaguePath(league);
    
    // ESPN API doesn't have a batch endpoint, so we'll make individual requests
    const promises = ids.map(async (id) => {
      if (resource === 'teams') {
        const response = await fetch(`${API_URL}/${leaguePath}/teams/${id}`);
        const data = await response.json();
        return data.team;
      }
      return {};
    });
    
    const data = await Promise.all(promises);
    
    return {
      data,
    };
  },
};
