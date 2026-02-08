import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useList } from '@refinedev/core';
import { useAppSelector } from '../../store/hooks';
import { 
  TeamCard, 
  TeamDetailsModal, 
  LoadingState, 
  ErrorState, 
  EmptyState 
} from '../../components';
import { TeamItem } from '../../types/espn';

export const Teams = () => {
  const selectedLeague = useAppSelector((state) => state.league.selectedLeague);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const { data, isLoading, isError } = useList<TeamItem>({
    resource: 'teams',
    meta: {
      league: selectedLeague,
    },
  });

  const teams = data?.data || [];

  if (isLoading) {
    return <LoadingState message="Loading teams..." />;
  }

  if (isError) {
    return <ErrorState message="Failed to load teams. Please try again." />;
  }

  if (teams.length === 0) {
    return (
      <EmptyState
        message="There are no teams available at the moment."
      />
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Teams
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {teams.map((teamItem: TeamItem) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={teamItem.team.id}>
            <TeamCard team={teamItem.team} onClick={() => setSelectedTeamId(teamItem.team.id)} />
          </Grid>
        ))}
      </Grid>

      <TeamDetailsModal
        teamId={selectedTeamId}
        league={selectedLeague}
        open={!!selectedTeamId}
        onClose={() => setSelectedTeamId(null)}
      />
    </Box>
  );
};
