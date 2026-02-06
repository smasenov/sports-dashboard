import { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { useScoreboard } from '../hooks/useScoreboard';
import { GameCard } from '../components/GameCard';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { GameDetailsDrawer } from '../components/GameDetailsDrawer';

export const Scoreboard: React.FC = () => {
  const selectedLeague = useAppSelector((state) => state.league.selectedLeague);
  const { data, isLoading, error, refetch } = useScoreboard(selectedLeague);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  if (isLoading) {
    return <LoadingState message="Loading scoreboard..." />;
  }

  if (error) {
    return (
      <ErrorState 
        message={error instanceof Error ? error.message : 'Failed to load scoreboard'}
        onRetry={() => refetch()}
      />
    );
  }

  if (!data || !data.events || data.events.length === 0) {
    return (
      <EmptyState 
        message="No games available"
        icon={selectedLeague === 'nba' ? 'basketball' : 'football'}
      />
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        {selectedLeague.toUpperCase()} Scoreboard
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        {data.events.length} game{data.events.length !== 1 ? 's' : ''} found
      </Typography>

      <Grid container spacing={3}>
        {data.events.map((event) => (
          <Grid item xs={12} sm={6} lg={4} key={event.id}>
            <GameCard 
              event={event}
              onClick={() => setSelectedGameId(event.id)}
            />
          </Grid>
        ))}
      </Grid>

      <GameDetailsDrawer
        gameId={selectedGameId}
        league={selectedLeague}
        open={!!selectedGameId}
        onClose={() => setSelectedGameId(null)}
      />
    </Box>
  );
};
