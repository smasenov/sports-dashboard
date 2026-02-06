import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { useState } from 'react';
import { useGameSummary } from '../hooks/useGameSummary';
import { LeagueType } from '../store/leagueSlice';
import { LoadingState } from './common/LoadingState';
import { ErrorState } from './common/ErrorState';
import { TeamLogo, GradientBackground } from './styled/StyledCard';

interface GameDetailsDrawerProps {
  gameId: string | null;
  league: LeagueType;
  open: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`game-details-tabpanel-${index}`}
      aria-labelledby={`game-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export const GameDetailsDrawer: React.FC<GameDetailsDrawerProps> = ({
  gameId,
  league,
  open,
  onClose,
}) => {
  const { data, isLoading, error, refetch } = useGameSummary(league, gameId);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState message="Loading game details..." />;
    }

    if (error) {
      return (
        <ErrorState
          message={error instanceof Error ? error.message : 'Failed to load game details'}
          onRetry={() => refetch()}
        />
      );
    }

    if (!data || !data.header) {
      return <ErrorState message="No game data available" />;
    }

    const competition = data.header.competitions[0];
    const homeTeam = competition.competitors.find((c) => c.homeAway === 'home');
    const awayTeam = competition.competitors.find((c) => c.homeAway === 'away');

    return (
      <>
        {/* Header */}
        <GradientBackground>
          <Grid container spacing={3} alignItems="center">
            {/* Away Team */}
            <Grid item xs={5} textAlign="center">
              <TeamLogo src={awayTeam?.team.logo} alt={awayTeam?.team.displayName} />
              <Typography variant="h6" fontWeight={600} mt={1} color="white">
                {awayTeam?.team.displayName}
              </Typography>
              {awayTeam?.record && awayTeam.record[0] && (
                <Typography variant="caption" color="rgba(255,255,255,0.8)">
                  {awayTeam.record[0].displayValue}
                </Typography>
              )}
            </Grid>

            {/* Score */}
            <Grid item xs={2} textAlign="center">
              <Typography variant="h3" fontWeight={700} color="white">
                {awayTeam?.score} - {homeTeam?.score}
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.9)">
                {competition.status.type.detail}
              </Typography>
            </Grid>

            {/* Home Team */}
            <Grid item xs={5} textAlign="center">
              <TeamLogo src={homeTeam?.team.logo} alt={homeTeam?.team.displayName} />
              <Typography variant="h6" fontWeight={600} mt={1} color="white">
                {homeTeam?.team.displayName}
              </Typography>
              {homeTeam?.record && homeTeam.record[0] && (
                <Typography variant="caption" color="rgba(255,255,255,0.8)">
                  {homeTeam.record[0].displayValue}
                </Typography>
              )}
            </Grid>
          </Grid>
        </GradientBackground>

        {/* Game Info */}
        {data.gameInfo && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                {data.gameInfo.venue && (
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOnIcon color="action" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Venue
                        </Typography>
                        <Typography variant="body2">
                          {data.gameInfo.venue.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {data.gameInfo.venue.address.city}
                          {data.gameInfo.venue.address.state && `, ${data.gameInfo.venue.address.state}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
                {data.gameInfo.attendance && (
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PeopleIcon color="action" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Attendance
                        </Typography>
                        <Typography variant="body2">
                          {data.gameInfo.attendance.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Leaders" />
            <Tab label="Team Stats" />
            {data.boxscore?.players && <Tab label="Box Score" />}
          </Tabs>
        </Box>

        {/* Leaders Tab */}
        <TabPanel value={tabValue} index={0}>
          {data.leaders && data.leaders.length > 0 ? (
            <Grid container spacing={2}>
              {data.leaders.map((leader, idx) => (
                <Grid item xs={12} key={idx}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {leader.displayName}
                      </Typography>
                      {leader.leaders.map((item, itemIdx) => (
                        <Box key={itemIdx} mb={2}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={2}>
                              <TeamLogo
                                src={item.team.logo}
                                alt={item.team.displayName}
                                style={{ width: 40, height: 40 }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1" fontWeight={600}>
                                {item.athlete.displayName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.team.displayName}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} textAlign="right">
                              <Chip
                                label={item.displayValue}
                                color="primary"
                                variant="outlined"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">No leader data available</Typography>
          )}
        </TabPanel>

        {/* Team Stats Tab */}
        <TabPanel value={tabValue} index={1}>
          {data.boxscore?.teams && data.boxscore.teams.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Statistic</TableCell>
                    <TableCell align="center">{awayTeam?.team.abbreviation}</TableCell>
                    <TableCell align="center">{homeTeam?.team.abbreviation}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.boxscore.teams[0]?.statistics.map((stat, idx) => {
                    const homeStat = data.boxscore.teams[1]?.statistics[idx];
                    return (
                      <TableRow key={stat.name}>
                        <TableCell>{stat.displayName}</TableCell>
                        <TableCell align="center">{stat.displayValue}</TableCell>
                        <TableCell align="center">{homeStat?.displayValue || '-'}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography color="text.secondary">No team stats available</Typography>
          )}
        </TabPanel>

        {/* Box Score Tab */}
        {data.boxscore?.players && (
          <TabPanel value={tabValue} index={2}>
            {data.boxscore.players.map((teamPlayers, teamIdx) => (
              <Box key={teamIdx} mb={4}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {teamPlayers.team.displayName}
                </Typography>
                {teamPlayers.statistics.map((statGroup, groupIdx) => (
                  <Box key={groupIdx} mb={3}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">
                      {statGroup.text}
                    </Typography>
                    <TableContainer component={Paper} sx={{ mb: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Player</TableCell>
                            {statGroup.labels.map((label, labelIdx) => (
                              <TableCell key={labelIdx} align="center">
                                {label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {statGroup.athletes.map((athlete, athleteIdx) => (
                            <TableRow key={athleteIdx}>
                              <TableCell>
                                <Typography variant="body2" fontWeight={500}>
                                  {athlete.athlete.shortName}
                                </Typography>
                                {athlete.athlete.position && (
                                  <Typography variant="caption" color="text.secondary">
                                    {athlete.athlete.position.abbreviation}
                                  </Typography>
                                )}
                              </TableCell>
                              {athlete.stats.map((stat, statIdx) => (
                                <TableCell key={statIdx} align="center">
                                  {stat}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
              </Box>
            ))}
          </TabPanel>
        )}
      </>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '500px', md: '700px' },
          maxWidth: '100%',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight={700}>
          Game Details
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2, overflow: 'auto', pb: 4 }}>{renderContent()}</Box>
    </Drawer>
  );
};
