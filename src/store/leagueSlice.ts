import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LeagueType = 'nba' | 'nfl';

interface LeagueState {
  selectedLeague: LeagueType;
}

const initialState: LeagueState = {
  selectedLeague: 'nba',
};

const leagueSlice = createSlice({
  name: 'league',
  initialState,
  reducers: {
    setLeague: (state, action: PayloadAction<LeagueType>) => {
      state.selectedLeague = action.payload;
    },
  },
});

export const { setLeague } = leagueSlice.actions;
export default leagueSlice.reducer;
