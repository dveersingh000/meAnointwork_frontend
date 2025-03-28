import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
  Box
} from '@mui/material';
import {
  Dashboard, Person, Lock, Logout, Work, CalendarMonth
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const menu = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'View Details', icon: <Person />, path: '/dashboard/view-details' },
    { text: 'Change Password', icon: <Lock />, path: '/dashboard/change-password' },
    { text: 'Work Expire (2025-04-21)', icon: <CalendarMonth />, path: '#' },
    { text: 'Start Work', icon: <Work />, path: '/dashboard/start-work' },
    { text: 'Logout', icon: <Logout />, path: '/logout' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#2d2d2d',
          color: '#fff'
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Me Anointwork
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menu.map((item, index) => (
            <ListItemButton
              key={index}
              component={item.path !== '#' ? NavLink : 'div'}
              to={item.path}
              sx={{
                '&.active': { backgroundColor: '#424242' },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
