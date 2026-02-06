import { CardContent, Typography, Box } from '@mui/material';
import { Team } from '../types/espn';
import { StyledTeamCard, TeamLogo, GradientBackground } from './styled/StyledCard';

interface TeamCardProps {
  team: Team;
  onClick: () => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, onClick }) => {
  return (
    <StyledTeamCard onClick={onClick}>
      <GradientBackground color={team.color}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="120px">
          <TeamLogo 
            src={team.logo} 
            alt={team.displayName}
            style={{ width: 80, height: 80 }}
          />
        </Box>
      </GradientBackground>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {team.displayName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {team.location}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            mt: 1, 
            display: 'inline-block',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            bgcolor: `#${team.color}20`,
            color: `#${team.color}`,
            fontWeight: 600
          }}
        >
          {team.abbreviation}
        </Typography>
      </CardContent>
    </StyledTeamCard>
  );
};
