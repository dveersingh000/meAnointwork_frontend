import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea
} from '@mui/material';
import { Person, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email');

  const tiles = [
    {
      label: "View Details",
      icon: <Person sx={{ fontSize: 50, color: '#fff' }} />,
      bgColor: "#f44336",
      route: "/dashboard/view-details"
    },
    {
      label: "Change Password",
      icon: <Lock sx={{ fontSize: 50, color: '#fff' }} />,
      bgColor: "#8e24aa",
      route: "/dashboard/change-password"
    }
  ];

  return (
    <Box>
      {/* Breadcrumb Section */}
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
        Dashboard &nbsp; &gt; &nbsp; <strong>{userEmail}</strong>
      </Typography>

      {/* Cards Section */}
      <Grid container spacing={3}>
        {tiles.map((tile, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: tile.bgColor,
                borderRadius: 2,
              }}
            >
              <CardActionArea
                onClick={() => navigate(tile.route)}
                sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {tile.icon}
                <CardContent>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ color: '#fff', fontWeight: 'bold' }}
                  >
                    {tile.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
