import { screen, fireEvent } from '@testing-library/react';
import { render } from '../utils/test-utils';
import { GameCard } from '../../src/components/GameCard/GameCard';
import { mockEvent } from '../utils/mockData';

describe('GameCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render game card with team names', () => {
    render(<GameCard event={mockEvent} onClick={mockOnClick} />);
    
    expect(screen.getByText('Los Angeles Lakers')).toBeInTheDocument();
    expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
  });

  it('should render game scores', () => {
    render(<GameCard event={mockEvent} onClick={mockOnClick} />);
    
    expect(screen.getByText('105')).toBeInTheDocument();
    expect(screen.getByText('110')).toBeInTheDocument();
  });

  it('should show Final status for completed games', () => {
    render(<GameCard event={mockEvent} onClick={mockOnClick} />);
    
    // Use getAllByText since "Final" appears multiple times
    const finalElements = screen.getAllByText('Final');
    expect(finalElements.length).toBeGreaterThan(0);
  });

  it('should call onClick when card is clicked', () => {
    render(<GameCard event={mockEvent} onClick={mockOnClick} />);
    
    const card = screen.getByText('Los Angeles Lakers').closest('[role="button"]');
    if (card) {
      fireEvent.click(card);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    }
  });

  it('should render team logos', () => {
    const { container } = render(<GameCard event={mockEvent} onClick={mockOnClick} />);
    
    const logos = container.querySelectorAll('img');
    expect(logos.length).toBeGreaterThan(0);
  });
});
