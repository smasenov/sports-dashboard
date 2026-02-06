import { useState } from 'react';
import { Grid, Typography, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '../store/hooks';
import { useTeams } from '../hooks/useTeams';
import { TeamCard } from '../components/TeamCard';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { TeamDetailsModal } from '../components/TeamDetailsModal';

export const Teams: React.FC = () => {
  const selectedLeague = useAppSelector((state) => state.league.selectedLeague);
  const { data, isLoading, error, refetch } = useTeams(selectedLeague);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = data?.filter((team) =>
    team.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <LoadingState message="Loading teams..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Failed to load teams'}
        onRetry={() => refetch()}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        message="No teams available"
        icon={selectedLeague === 'nba' ? 'basketball' : 'football'}
      />
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            {selectedLeague.toUpperCase()} Teams
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredTeams?.length || 0} team{filteredTeams?.length !== 1 ? 's' : ''} found
          </Typography>
        </Box>
        <TextField
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredTeams && filteredTeams.length > 0 ? (
        <Grid container spacing={3}>
          {filteredTeams.map((team) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={team.id}>
              <TeamCard team={team} onClick={() => setSelectedTeamId(team.id)} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState message="No teams match your search" />
      )}

      <TeamDetailsModal
        teamId={selectedTeamId}
        league={selectedLeague}
        open={!!selectedTeamId}
        onClose={() => setSelectedTeamId(null)}
      />
    </Box>
  );
};
