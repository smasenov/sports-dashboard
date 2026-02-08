import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useList } from '@refinedev/core';
import { useAppSelector } from '../store/hooks';
import { GameCard } from '../components/GameCard';
import { GameDetailsDrawer } from '../components/GameDetailsDrawer';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { Event } from '../types/espn';

export const Scoreboard = () => {
  const selectedLeague = useAppSelector((state) => state.league.selectedLeague);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const { data, isLoading, isError } = useList<Event>({
    resource: 'games',
    meta: {
      league: selectedLeague,
    },
  });

  const games = data?.data || [];

  if (isLoading) {
    return <LoadingState message="Loading games..." />;
  }

  if (isError) {
    return <ErrorState message="Failed to load games. Please try again." />;
  }

  if (games.length === 0) {
    return (
      <EmptyState
        message="There are no games scheduled at the moment."
      />
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Live Scoreboard
      </Typography>

      <Grid 
        container 
        spacing={{ xs: 2, sm: 3 }}
        sx={{
          justifyContent: games.length <= 2 ? 'center' : 'flex-start',
        }}
      >
        {games.map((game: Event) => (
          <Grid 
            item 
            xs={12} 
            sm={games.length === 1 ? 12 : 6} 
            md={games.length === 1 ? 12 : 12}
            lg={games.length === 1 ? 12 : games.length === 2 ? 6 : 4} 
            key={game.id}
          >
            <GameCard event={game} onClick={() => setSelectedGameId(game.id)} />
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
