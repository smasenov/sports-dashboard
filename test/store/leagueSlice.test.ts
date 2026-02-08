import leagueReducer, { setLeague, LeagueType } from '../../src/store/leagueSlice';

describe('leagueSlice', () => {
  const initialState = {
    selectedLeague: 'nba' as LeagueType,
  };

  it('should return the initial state', () => {
    expect(leagueReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setLeague to NBA', () => {
    const actual = leagueReducer(initialState, setLeague('nba'));
    expect(actual.selectedLeague).toEqual('nba');
  });

  it('should handle setLeague to NFL', () => {
    const actual = leagueReducer(initialState, setLeague('nfl'));
    expect(actual.selectedLeague).toEqual('nfl');
  });

  it('should switch from NBA to NFL', () => {
    const nbaState = { selectedLeague: 'nba' as LeagueType };
    const actual = leagueReducer(nbaState, setLeague('nfl'));
    expect(actual.selectedLeague).toEqual('nfl');
  });
});
