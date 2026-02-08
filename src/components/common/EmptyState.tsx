import { Box, Typography } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import styled from '@emotion/styled';

const EmptyContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
  text-align: center;
  padding: 24px;
`;

const EmptyIconWrapper = styled(Box)`
  font-size: 64px;
  color: #bdbdbd;
  opacity: 0.6;
`;

interface EmptyStateProps {
  message?: string;
  icon?: 'basketball' | 'football' | 'default';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No data available',
  icon = 'default'
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'basketball':
        return <SportsBasketballIcon fontSize="inherit" />;
      case 'football':
        return <SportsFootballIcon fontSize="inherit" />;
      default:
        return <SportsBasketballIcon fontSize="inherit" />;
    }
  };

  return (
    <EmptyContainer>
      <EmptyIconWrapper>
        {renderIcon()}
      </EmptyIconWrapper>
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
      <Typography variant="body2" color="text.disabled">
        Try selecting a different league or check back later.
      </Typography>
    </EmptyContainer>
  );
};
