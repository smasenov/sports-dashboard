import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import styled from '@emotion/styled';
import { useAppSelector } from '../store/hooks';
import { useScoreboard } from '../hooks/useScoreboard';
import { useTeams } from '../hooks/useTeams';

const HeroSection = styled(Box)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 48px 24px;
  border-radius: 16px;
  color: white;
  margin-bottom: 32px;
  text-align: center;
`;

const StatCard = styled(Card)`
  height: 100%;
  transition: transform 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const selectedLeague = useAppSelector((state) => state.league.selectedLeague);
  const { data: scoreboardData } = useScoreboard(selectedLeague);
  const { data: teamsData } = useTeams(selectedLeague);

  const liveGames = scoreboardData?.events?.filter(
    (event) => event.status.type.state === 'in'
  ).length || 0;

  const upcomingGames = scoreboardData?.events?.filter(
    (event) => event.status.type.state === 'pre'
  ).length || 0;

  const totalTeams = teamsData?.length || 0;

  return (
    <Box>
      <HeroSection>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Sports Dashboard
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.95, mb: 3 }}>
          Track live scores, stats, and teams for {selectedLeague.toUpperCase()}
        </Typography>
        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/scoreboard')}
            sx={{
              bgcolor: 'white',
              color: '#667eea',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
            }}
          >
            View Scoreboard
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/teams')}
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Browse Teams
          </Button>
        </Box>
      </HeroSection>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard onClick={() => navigate('/scoreboard')}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Games
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {scoreboardData?.events?.length || 0}
                  </Typography>
                </Box>
                <DashboardIcon sx={{ fontSize: 48, color: '#667eea', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard onClick={() => navigate('/scoreboard')}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Live Games
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="error">
                    {liveGames}
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 48, color: '#ff4444', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard onClick={() => navigate('/scoreboard')}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Upcoming
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {upcomingGames}
                  </Typography>
                </Box>
                <SportsBasketballIcon sx={{ fontSize: 48, color: '#2196f3', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard onClick={() => navigate('/teams')}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Teams
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {totalTeams}
                  </Typography>
                </Box>
                <GroupsIcon sx={{ fontSize: 48, color: '#4caf50', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </StatCard>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Welcome to Sports Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              This dashboard provides real-time sports data powered by ESPN's public API. 
              You can track live scores, view game details, explore team information, and more.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Features:</strong>
            </Typography>
            <Box component="ul" sx={{ mt: 1 }}>
              <Typography component="li" variant="body2" color="text.secondary">
                Real-time scoreboard updates with live game tracking
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Detailed game summaries with box scores and statistics
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Comprehensive team information and details
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Support for NBA and NFL leagues
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
