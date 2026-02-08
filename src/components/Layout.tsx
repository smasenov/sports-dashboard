import { useState } from 'react';
import { Box, AppBar, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Container, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate, useLocation } from 'react-router-dom';
import { LeagueSelector } from './LeagueSelector';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Scoreboard', icon: <DashboardIcon />, path: '/scoreboard' },
    { text: 'Teams', icon: <GroupsIcon />, path: '/teams' },
  ];

  const drawer = (
    <>
      {/* Spacer for fixed AppBar */}
      <Box sx={{ height: 64 }} />
      <Box sx={{ overflow: 'auto', mt: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) {
                    setMobileOpen(false);
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: '#000',
          boxShadow: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1, fontWeight: 700, fontSize: { xs: '1rem', sm: '1.2rem' }, color: '#1a1a1a' }}>
            Sports Dashboard
          </Box>
          <LeagueSelector />
        </Toolbar>
      </AppBar>

      {/* Drawer - Mobile (temporary) */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Drawer - Desktop (permanent) */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        {/* Spacer for fixed AppBar */}
        <Box sx={{ height: 64 }} />
        <Container 
          maxWidth="xl"
          sx={{
            px: { xs: 1, sm: 2, md: 3 }
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};
