import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import axios from '../../utlis/axios';

const AdminWorkAssignments = () => {
  const [users, setUsers] = useState([]);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    axios.get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  const handleToggleAssignment = async (userId, current) => {
    setAssigning(true);
    try {
      await axios.post('/admin/assign-work', { userId, workAssigned: !current });
      const updated = users.map(user =>
        user._id === userId ? { ...user, workAssigned: !current } : user
      );
      setUsers(updated);
      alert(`Work ${!current ? 'assigned' : 'unassigned'} successfully`);
    } catch (err) {
      console.error(err);
      alert('Error updating work assignment');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Work Assignment</Typography>
      {users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        users.map((user) => (
          <Paper key={user._id} sx={{ p: 2, my: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography>{user.email}</Typography>
              <Typography variant="body2" color={user.workAssigned ? 'green' : 'error'}>
                {user.workAssigned ? 'Assigned' : 'Not Assigned'}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color={user.workAssigned ? 'error' : 'primary'}
              onClick={() => handleToggleAssignment(user._id, user.workAssigned)}
              disabled={assigning}
            >
              {user.workAssigned ? 'Unassign' : 'Assign'}
            </Button>
          </Paper>
        ))
      )}
      {assigning && <CircularProgress size={24} sx={{ mt: 2 }} />}
    </Box>
  );
};

export default AdminWorkAssignments;
