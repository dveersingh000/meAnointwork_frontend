import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper, Grid, Alert
} from '@mui/material';
import axios from '../../utlis/axios';

const AdminSettings = () => {
  const [form, setForm] = useState({ current: '', new: '', confirm: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (form.new !== form.confirm) {
      setError("New passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await axios.post('/admin/change-password', {
        currentPassword: form.current,
        newPassword: form.new,
      });
      setMessage("Password updated successfully");
      setForm({ current: '', new: '', confirm: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Change Admin Password</Typography>

      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                required
                value={form.current}
                onChange={(e) => setForm({ ...form, current: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                required
                value={form.new}
                onChange={(e) => setForm({ ...form, new: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                required
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" disabled={loading} fullWidth>
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
              {message && <Alert severity="success">{message}</Alert>}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminSettings;
