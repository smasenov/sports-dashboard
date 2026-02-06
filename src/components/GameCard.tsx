import { CardContent, Grid, Typography, Box, Chip } from '@mui/material';
import { Event } from '../types/espn';
import { StyledGameCard, TeamLogo, ScoreDisplay, LiveIndicator, StatusBadge } from './styled/StyledCard';

interface GameCardProps {
  event: Event;
  onClick: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ event, onClick }) => {
  const competition = event.competitions[0];
  const homeTeam = competition.competitors.find(c => c.homeAway === 'home');
  const awayTeam = competition.competitors.find(c => c.homeAway === 'away');
  const status = competition.status;

  const isLive = status.type.state === 'in';
  const isCompleted = status.type.state === 'post';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <StyledGameCard 
      status={status.type.state}
      onClick={onClick}
      sx={{ cursor: 'pointer', height: '100%' }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Status */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          {isLive ? (
            <LiveIndicator>Live</LiveIndicator>
          ) : (
            <StatusBadge state={status.type.state}>
              {isCompleted ? 'Final' : formatDate(event.date)}
            </StatusBadge>
          )}
          {isLive && (
            <Typography variant="body2" fontWeight={600} color="error">
              {status.displayClock}
            </Typography>
          )}
        </Box>

        {/* Away Team */}
        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid item xs={2}>
            <TeamLogo 
              src={awayTeam?.team.logo} 
              alt={awayTeam?.team.displayName}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h6" fontWeight={600}>
              {awayTeam?.team.displayName}
            </Typography>
            {awayTeam?.record && awayTeam.record[0] && (
              <Typography variant="caption" color="text.secondary">
                {awayTeam.record[0].displayValue}
              </Typography>
            )}
          </Grid>
          <Grid item xs={3} textAlign="right">
            {(isLive || isCompleted) && (
              <ScoreDisplay>{awayTeam?.score}</ScoreDisplay>
            )}
          </Grid>
        </Grid>

        {/* Home Team */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <TeamLogo 
              src={homeTeam?.team.logo} 
              alt={homeTeam?.team.displayName}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h6" fontWeight={600}>
              {homeTeam?.team.displayName}
            </Typography>
            {homeTeam?.record && homeTeam.record[0] && (
              <Typography variant="caption" color="text.secondary">
                {homeTeam.record[0].displayValue}
              </Typography>
            )}
          </Grid>
          <Grid item xs={3} textAlign="right">
            {(isLive || isCompleted) && (
              <ScoreDisplay>{homeTeam?.score}</ScoreDisplay>
            )}
          </Grid>
        </Grid>

        {/* Additional Info */}
        {status.type.detail && !isLive && (
          <Box mt={2} pt={2} borderTop="1px solid" borderColor="divider">
            <Typography variant="caption" color="text.secondary">
              {status.type.detail}
            </Typography>
          </Box>
        )}

        {/* Broadcasts */}
        {competition.broadcasts && competition.broadcasts.length > 0 && (
          <Box mt={2} display="flex" gap={1} flexWrap="wrap">
            {competition.broadcasts.map((broadcast, idx) => (
              <Chip 
                key={idx}
                label={broadcast.names.join(', ')}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </CardContent>
    </StyledGameCard>
  );
};
