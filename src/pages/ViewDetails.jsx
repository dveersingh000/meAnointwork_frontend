import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid
} from '@mui/material';

const ViewDetails = () => {
  // Dummy user data (can replace with API response later)
  const user = {
    name: 'Kishan Sharma',
    email: 'stkishan45@gmail.com',
    mobile: '+91 9876543210',
    role: 'Worker',
    joinedDate: 'March 20, 2024'
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        User Details
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Name</Typography>
            <Typography variant="body1">{user.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Email</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Mobile</Typography>
            <Typography variant="body1">{user.mobile}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Role</Typography>
            <Typography variant="body1">{user.role}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">Joined Date</Typography>
            <Typography variant="body1">{user.joinedDate}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ViewDetails;
