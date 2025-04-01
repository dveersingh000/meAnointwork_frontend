import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Divider
} from '@mui/material';
import axios from '../utlis/axios';

const ViewDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get('/user/me');
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        User Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Personal Info */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Personal Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Name</Typography>
            <Typography>{user.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Email</Typography>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Mobile</Typography>
            <Typography>{user.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Joined Date</Typography>
            <Typography>{new Date(user.createdAt).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>

        {/* Plan Info */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}>
          Work Plan Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Plan Type</Typography>
            <Typography>{user.planType}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Work Type</Typography>
            <Typography>{user.workType}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Amount</Typography>
            <Typography>₹ {user.amount}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Plan Expiry</Typography>
            <Typography>{new Date(user.planExpireDate).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>

        {/* Address + Status */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}>
          Status & Address
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">City</Typography>
            <Typography>{user.city}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">State</Typography>
            <Typography>{user.state}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Pincode</Typography>
            <Typography>{user.pincode}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Account Status</Typography>
            <Typography>{user.status === 'active' ? 'Active ✅' : 'Inactive ❌'}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ViewDetails;
