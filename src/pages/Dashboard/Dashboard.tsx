import { Box, Grid, Card, CardContent, Typography, Alert, Paper, Chip } from '@mui/material';
import { useList } from '@refinedev/core';
import { useAppSelector } from '../../store/hooks';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import EventIcon from '@mui/icons-material/Event';
import { LoadingState } from '../../components';
import type { Event } from '../../types/espn';

export const Dashboard = () => {
  const selectedLeague = useAppSelector((state) => state.league.selectedLeague);

  const { data: gamesData, isLoading: gamesLoading } = useList({
    resource: 'games',
    meta: { league: selectedLeague },
  });

  const { data: teamsData, isLoading: teamsLoading } = useList({
    resource: 'teams',
    meta: { league: selectedLeague },
  });

  const games = (gamesData?.data || []) as Event[];
  const teams = teamsData?.data || [];

  const liveGames = games.filter((game) => game.status?.type?.state === 'in');
  const upcomingGames = games.filter((game) => game.status?.type?.state === 'pre');

  if (gamesLoading || teamsLoading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  const leagueLabel = selectedLeague === 'nba' ? 'NBA' : 'NFL';
  const LeagueIcon = selectedLeague === 'nba' ? SportsBasketballIcon : SportsFootballIcon;

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Typography variant="h4" fontWeight="bold">
          {leagueLabel} Dashboard
        </Typography>
        <Chip 
          label={`${games.length} Games`} 
          color="primary" 
          size="small"
        />
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        Data is fetched from ESPN's public API. This dashboard provides real-time sports scores
        and team information.
      </Alert>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* Total Games Card */}
        <Grid item xs={12} sm={6} lg={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    {games.length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Total Games
                  </Typography>
                </Box>
                <LeagueIcon sx={{ fontSize: 56, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Live Games Card */}
        <Grid item xs={12} sm={6} lg={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    {liveGames.length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Live Games
                  </Typography>
                </Box>
                <LeagueIcon sx={{ fontSize: 56, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Games Card */}
        <Grid item xs={12} sm={6} lg={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    {upcomingGames.length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Upcoming Games
                  </Typography>
                </Box>
                <LeagueIcon sx={{ fontSize: 56, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Teams Card */}
        <Grid item xs={12} sm={6} lg={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    {teams.length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Total Teams
                  </Typography>
                </Box>
                <GroupsIcon sx={{ fontSize: 56, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Stats Section */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Quick Stats
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              }}
            >
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Game Status Breakdown
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" fontWeight="bold" color="success.main">
                      {games.filter((g) => g.status?.type?.completed).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" fontWeight="bold" color="info.main">
                      {upcomingGames.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Scheduled
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              }}
            >
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  League Information
                </Typography>
              </Box>
              <Box sx={{ py: 1 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>{leagueLabel}</strong> - {teams.length} Teams
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {liveGames.length > 0 
                    ? `${liveGames.length} game${liveGames.length > 1 ? 's' : ''} currently in progress`
                    : 'No games currently in progress'
                  }
                </Typography>
                {upcomingGames.length > 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {upcomingGames.length} upcoming game{upcomingGames.length > 1 ? 's' : ''} scheduled
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Navigation Card */}
      <Box mt={4}>
        <Card
          elevation={3}
          sx={{
            borderRadius: 2,
            background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
          }}
        >
          <CardContent sx={{ py: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Explore More
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Navigate to the <strong>Scoreboard</strong> page to view detailed game information and live scores, 
              or visit the <strong>Teams</strong> page to explore all {leagueLabel} teams and their statistics.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
