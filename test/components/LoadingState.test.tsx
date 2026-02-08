import { screen } from '@testing-library/react';
import { render } from '../utils/test-utils';
import { LoadingState } from '../../src/components/common/LoadingState/LoadingState';

describe('LoadingState', () => {
  it('should render with default message', () => {
    render(<LoadingState />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(<LoadingState message="Loading games..." />);
    expect(screen.getByText('Loading games...')).toBeInTheDocument();
  });

  it('should render CircularProgress', () => {
    const { container } = render(<LoadingState />);
    const spinner = container.querySelector('[role="progressbar"]');
    expect(spinner).toBeInTheDocument();
  });
});
