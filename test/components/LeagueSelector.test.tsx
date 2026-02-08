import { screen, fireEvent } from '@testing-library/react';
import { render, createTestStore } from '../utils/test-utils';
import { LeagueSelector } from '../../src/components/LeagueSelector/LeagueSelector';
import { RootState } from '../../src/store/store';

describe('LeagueSelector', () => {
  it('should render with NBA selected by default', () => {
    render(<LeagueSelector />);
    
    // MUI Select stores value in hidden input
    const hiddenInput = document.querySelector('input[value="nba"]');
    expect(hiddenInput).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveTextContent('NBA');
  });

  it('should render both NBA and NFL options', () => {
    render(<LeagueSelector />);
    
    // Click to open dropdown
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    
    // Check options are visible using getAllByRole
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('NBA');
    expect(options[1]).toHaveTextContent('NFL');
  });

  it('should change league when option is selected', () => {
    const store = createTestStore();
    render(<LeagueSelector />, { store });
    
    // Initial state is NBA
    expect((store.getState() as RootState).league.selectedLeague).toBe('nba');
    
    // Open dropdown and select NFL
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    
    const options = screen.getAllByRole('option');
    const nflOption = options.find(opt => opt.getAttribute('data-value') === 'nfl');
    if (nflOption) {
      fireEvent.click(nflOption);
    }
    
    // State should be updated
    expect((store.getState() as RootState).league.selectedLeague).toBe('nfl');
  });

  it('should show NFL as selected when store has NFL', () => {
    const store = createTestStore({
      league: { selectedLeague: 'nfl' },
    });
    
    render(<LeagueSelector />, { store });
    
    // MUI Select stores value in hidden input
    const hiddenInput = document.querySelector('input[value="nfl"]');
    expect(hiddenInput).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveTextContent('NFL');
  });
});
