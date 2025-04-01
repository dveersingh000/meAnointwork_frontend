import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import axios from '../utlis/axios'; // <-- axios with token interceptor

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: '', message: '' });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return setAlert({ open: true, type: 'error', message: 'New passwords do not match' });
    }

    setLoading(true);
    try {
      const res = await axios.post('/auth/change-password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });

      setAlert({ open: true, type: 'success', message: 'Password updated successfully!' });
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const messageMap = {
        IncorrectCurrentPassword: 'Incorrect current password',
        NewPasswordSameAsOld: 'New password cannot be same as old',
        MissingFields: 'Please fill all fields',
        ServerError: 'Something went wrong'
      };

      const msg = messageMap[err.response?.data] || 'Failed to update password';
      setAlert({ open: true, type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Change Password
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  fullWidth
                  label={
                    field === 'currentPassword'
                      ? 'Current Password'
                      : field === 'newPassword'
                      ? 'New Password'
                      : 'Confirm New Password'
                  }
                  type={showPassword[field.split('Password')[0]] ? 'text' : 'password'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => toggleVisibility(field.split('Password')[0])}>
                          {showPassword[field.split('Password')[0]] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#1976d2',
                  fontWeight: 'bold',
                }}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alert.type} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChangePassword;
