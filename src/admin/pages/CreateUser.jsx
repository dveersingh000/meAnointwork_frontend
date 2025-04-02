import React, { useState } from 'react';
import {
  Box, TextField, Grid, Button, Paper, Typography, MenuItem
} from '@mui/material';
import axios from '../../utlis/axios';

const CreateUser = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    workType: '', planType: '', amount: '',
    pincode: '', state: '', city: '', status: 'active'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/create-user', form);
      alert('User created successfully!');
      setForm({ name: '', email: '', password: '', phone: '', workType: '', planType: '', amount: '', pincode: '', state: '', city: '', status: 'active' });
    } catch (err) {
      alert('Error: ' + err.response?.data || 'Server error');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Create New User</Typography>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { name: 'name', label: 'Full Name' },
              { name: 'email', label: 'Email' },
              { name: 'password', label: 'Password', type: 'password' },
              { name: 'phone', label: 'Phone' },
              { name: 'workType', label: 'Work Type' },
              { name: 'planType', label: 'Plan Type' },
              { name: 'amount', label: 'Amount' },
              { name: 'pincode', label: 'Pincode' },
              { name: 'state', label: 'State' },
              { name: 'city', label: 'City' },
            ].map(({ name, label, type }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  type={type || 'text'}
                  value={form[name]}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                name="status"
                label="Status"
                value={form.status}
                onChange={handleChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                sx={{ py: 1.3, px: 5 }}
              >
                Create User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateUser;
