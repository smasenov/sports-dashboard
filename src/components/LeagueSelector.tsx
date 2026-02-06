import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLeague, LeagueType } from '../store/leagueSlice';

export const LeagueSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedLeague = useAppSelector((state) => state.league.selectedLeague);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setLeague(event.target.value as LeagueType));
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="league-select-label">League</InputLabel>
      <Select
        labelId="league-select-label"
        id="league-select"
        value={selectedLeague}
        label="League"
        onChange={handleChange}
      >
        <MenuItem value="nba">
          <SportsBasketballIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          NBA
        </MenuItem>
        <MenuItem value="nfl">
          <SportsFootballIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          NFL
        </MenuItem>
      </Select>
    </FormControl>
  );
};
