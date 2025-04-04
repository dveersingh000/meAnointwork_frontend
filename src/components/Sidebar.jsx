import React, { useEffect, useState } from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Toolbar, Box
} from '@mui/material';
import {
  Dashboard, Person, Lock, Logout, Work, CalendarMonth
} from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../utlis/axios';
import dayjs from 'dayjs';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const [expiryDate, setExpiryDate] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const fetchPlanExpiry = async () => {
      try {
        const res = await axios.get('/user/plan-expiry');
        const expiry = dayjs(res.data.planExpireDate);
        setExpiryDate(expiry);
        setIsExpired(dayjs().isAfter(expiry));
      } catch (err) {
        console.error('Failed to fetch plan expiry:', err);
      }
    };
  
    fetchPlanExpiry();
  }, []);
  

  const menu = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'View Details', icon: <Person />, path: '/dashboard/view-details' },
    { text: 'Change Password', icon: <Lock />, path: '/dashboard/change-password' },
    {
      text: `Work Expire (${expiryDate ? expiryDate.format('YYYY-MM-DD') : '...'})`,
      icon: <CalendarMonth />,
      path: '#'
    },
    {
      text: 'Start Work',
      icon: <Work />,
      path: isExpired ? '#' : '/dashboard/start-work',
      action: isExpired
        ? () => alert('Your work assignment has expired.')
        : null
    },
    { text: 'Logout', icon: <Logout />, path: '/logout', action: handleLogout }
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
              component={item.path !== '#' && !item.action ? NavLink : 'div'}
              to={item.path !== '#' && !item.action ? item.path : undefined}
              onClick={item.action || undefined}
              sx={{
                '&.active': { backgroundColor: '#424242' },
                opacity: item.text.startsWith('Start Work') && isExpired ? 0.5 : 1
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
