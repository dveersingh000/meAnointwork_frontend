import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Box, Typography
} from '@mui/material';
import {
  Dashboard, People, AddBox, Payment, Assignment, Article, Lock, Logout
} from '@mui/icons-material';
import axios from '../utlis/axios'; 

const drawerWidth = 240;

const menu = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/admin' },
  { label: 'Users', icon: <People />, path: '/admin/users' },
  { label: 'Create User', icon: <AddBox />, path: '/admin/create-user' },
  { label: 'Payments', icon: <Payment />, path: '/admin/payments' },
  { label: 'Work Assignments', icon: <Assignment />, path: '/admin/work-assignments' },
  { label: 'Tasks', icon: <Article />, path: '/admin/tasks' },
  { label: 'Settings', icon: <Lock />, path: '/admin/settings' }
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#212121',
            color: '#fff'
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>Admin Panel</Typography>
        </Toolbar>

        <List>
          {menu.map((item, index) => (
            <ListItemButton
              key={index}
              component={NavLink}
              to={item.path}
              sx={{ '&.active': { backgroundColor: '#424242' } }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}

          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#fff' }}><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
