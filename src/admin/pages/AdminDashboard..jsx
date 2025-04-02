import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import axios from '../../utlis/axios';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get('/admin/metrics');
        const { totalUsers, activePlans, pendingPayments, totalTasks } = res.data;

        setMetrics([
          { label: 'Total Users', value: totalUsers, color: '#4caf50' },
          { label: 'Active Plans', value: activePlans, color: '#2196f3' },
          { label: 'Pending Payments', value: pendingPayments, color: '#f44336' },
          { label: 'Total Tasks', value: totalTasks, color: '#ff9800' }
        ]);
      } catch (err) {
        console.error('Failed to fetch metrics:', err);
      }
    };

    fetchMetrics();
  }, []);

  if (!metrics) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Welcome Admin!
      </Typography>

      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: metric.color, color: '#fff' }}>
              <Typography variant="h6">{metric.label}</Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>{metric.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
