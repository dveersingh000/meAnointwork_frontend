import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#f44336' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>

      <Button
        variant="contained"
        sx={{ px: 4, py: 1.5, borderRadius: 2, backgroundColor: '#1976d2' }}
        onClick={() => navigate('/dashboard')}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default NotFound;
