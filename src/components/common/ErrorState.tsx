import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import styled from '@emotion/styled';

const ErrorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
  text-align: center;
  padding: 24px;
`;

const ErrorIcon = styled(ErrorOutlineIcon)`
  font-size: 64px;
  color: #f44336;
  opacity: 0.8;
`;

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'Something went wrong. Please try again.',
  onRetry 
}) => {
  return (
    <ErrorContainer>
      <ErrorIcon />
      <Typography variant="h6" color="error" gutterBottom>
        Oops! An Error Occurred
      </Typography>
      <Typography variant="body2" color="text.secondary" maxWidth="400px">
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      )}
    </ErrorContainer>
  );
};
