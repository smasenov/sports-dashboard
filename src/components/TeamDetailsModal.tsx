import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTeamDetail } from '../hooks/useTeamDetail';
import { LeagueType } from '../store/leagueSlice';
import { LoadingState } from './common/LoadingState';
import { ErrorState } from './common/ErrorState';
import { TeamLogo, GradientBackground } from './styled/StyledCard';

interface TeamDetailsModalProps {
  teamId: string | null;
  league: LeagueType;
  open: boolean;
  onClose: () => void;
}

export const TeamDetailsModal: React.FC<TeamDetailsModalProps> = ({
  teamId,
  league,
  open,
  onClose,
}) => {
  const { data: team, isLoading, error, refetch } = useTeamDetail(league, teamId);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState message="Loading team details..." />;
    }

    if (error) {
      return (
        <ErrorState
          message={error instanceof Error ? error.message : 'Failed to load team details'}
          onRetry={() => refetch()}
        />
      );
    }

    if (!team) {
      return <ErrorState message="No team data available" />;
    }

    return (
      <>
        <GradientBackground color={team.color}>
          <Box display="flex" flexDirection="column" alignItems="center" py={2}>
            <TeamLogo 
              src={team.logo} 
              alt={team.displayName}
              style={{ width: 120, height: 120 }}
            />
            <Typography variant="h4" fontWeight={700} mt={2} color="white" textAlign="center">
              {team.displayName}
            </Typography>
            <Typography variant="h6" color="rgba(255,255,255,0.9)" textAlign="center">
              {team.location}
            </Typography>
          </Box>
        </GradientBackground>

        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Team Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Full Name
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {team.displayName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Short Name
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {team.shortDisplayName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Abbreviation
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {team.abbreviation}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Status
              </Typography>
              <Box mt={0.5}>
                <Chip
                  label={team.isActive ? 'Active' : 'Inactive'}
                  color={team.isActive ? 'success' : 'default'}
                  size="small"
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                Team Colors
              </Typography>
              <Box display="flex" gap={2} mt={1}>
                <Box>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: `#${team.color}`,
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                  <Typography variant="caption" display="block" mt={0.5} textAlign="center">
                    Primary
                  </Typography>
                  <Typography variant="caption" display="block" textAlign="center" color="text.secondary">
                    #{team.color}
                  </Typography>
                </Box>
                <Box>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: `#${team.alternateColor}`,
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                  <Typography variant="caption" display="block" mt={0.5} textAlign="center">
                    Alternate
                  </Typography>
                  <Typography variant="caption" display="block" textAlign="center" color="text.secondary">
                    #{team.alternateColor}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {team.logos && team.logos.length > 1 && (
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Additional Logos
                </Typography>
                <Box display="flex" gap={2} mt={1} flexWrap="wrap">
                  {team.logos.slice(1, 4).map((logo, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={logo.href}
                      alt={logo.alt}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: 'contain',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        p: 1,
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={700}>
          Team Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>{renderContent()}</DialogContent>
    </Dialog>
  );
};
