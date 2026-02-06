import { Box, CircularProgress, Typography } from '@mui/material';
import styled from '@emotion/styled';

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

const PulsingCircle = styled(Box)`
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid #1976d2;
    animation: pulse 2s ease-out infinite;
  }
  
  &::before {
    width: 60px;
    height: 60px;
  }
  
  &::after {
    width: 80px;
    height: 80px;
    animation-delay: 0.5s;
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0.8);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.5);
    }
  }
`;

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <LoadingContainer>
      <PulsingCircle>
        <CircularProgress size={40} />
      </PulsingCircle>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </LoadingContainer>
  );
};
