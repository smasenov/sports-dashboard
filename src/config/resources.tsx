import BorderAllIcon from '@mui/icons-material/BorderAll';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ResourceProps } from '@refinedev/core';

export const resources: ResourceProps[] = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Dashboard',
      icon: <DashboardIcon />,
    },
  },
  {
    name: 'scoreboard',
    list: '/scoreboard',
    meta: {
      label: 'Scoreboard',
      icon: <BorderAllIcon />,
    },
  },
  {
    name: 'teams',
    list: '/teams',
    meta: {
      label: 'Teams',
      icon: <GroupsIcon />,
    },
  },
];
