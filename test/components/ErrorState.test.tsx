import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../utils/test-utils';
import { ErrorState } from '../../src/components/common/ErrorState/ErrorState';

describe('ErrorState', () => {
  it('should render with default message', () => {
    render(<ErrorState />);
    expect(screen.getByText('Oops! An Error Occurred')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(<ErrorState message="Failed to load data" />);
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });

  it('should call onRetry when retry button is clicked', () => {
    const onRetry = jest.fn();
    render(<ErrorState onRetry={onRetry} />);
    
    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);
    
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorState />);
    const retryButton = screen.queryByRole('button', { name: /try again/i });
    expect(retryButton).not.toBeInTheDocument();
  });
});
