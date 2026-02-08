import { screen } from '@testing-library/react';
import { render } from '../utils/test-utils';
import { EmptyState } from '../../src/components/common/EmptyState/EmptyState';

describe('EmptyState', () => {
  it('should render with default message', () => {
    render(<EmptyState />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.getByText('Try selecting a different league or check back later.')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(<EmptyState message="No games scheduled" />);
    expect(screen.getByText('No games scheduled')).toBeInTheDocument();
  });

  it('should render basketball icon by default', () => {
    const { container } = render(<EmptyState />);
    // MUI icons render as SVG
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render football icon when specified', () => {
    const { container } = render(<EmptyState icon="football" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
