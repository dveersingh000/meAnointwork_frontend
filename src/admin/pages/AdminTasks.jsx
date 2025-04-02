import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, TextField, Paper, Grid, IconButton
} from '@mui/material';
import axios from '../../utlis/axios';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminTasks = () => {
  const [image, setImage] = useState(null);
  const [pageName, setPageName] = useState('');
  const [taskList, setTaskList] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/admin/tasks');
      setTaskList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpload = async () => {
    if (!image || !pageName) {
      alert('Page name and image are required!');
      return;
    }

    const formData = new FormData();
    formData.append('taskImage', image);
    formData.append('pageName', pageName);

    try {
      await axios.post('/admin/upload-task', formData);
      alert('Uploaded successfully!');
      setImage(null);
      setPageName('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Manage Tasks
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Page Name"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ height: '56px' }}
            >
              {image ? image.name : "Choose File"}
              <input
                hidden
                type="file"
                accept=".png,.jpg,.jpeg,.txt"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Upload Task
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Uploaded Tasks
      </Typography>

      <Grid container spacing={2}>
        {taskList.map((task) => (
          <Grid item xs={12} sm={6} md={3} key={task._id}>
            <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                {task.pageName}
              </Typography>

              {task.type === 'image' ? (
                <img
                src={`${import.meta.env.VITE_BASE_URL}/uploads/${task.filename}`}
                  alt={task.pageName}
                  style={{
                    width: '100%',
                    height: 150,
                    objectFit: 'contain',
                    borderRadius: 4,
                    marginBottom: '8px',
                  }}
                />
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  href={`/uploads/${task.filename}`}
                  target="_blank"
                >
                  View Text
                </Button>
              )}

              <IconButton
                color="error"
                onClick={() => handleDelete(task._id)}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminTasks;
