import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, TextField, Grid, Paper, CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utlis/axios';

const TaskEditor = () => {
  const { id } = useParams(); // pageName
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/user/tasks/${id}`);
        setTask(res.data);
  
        const draft = await axios.get(`/user/tasks/${id}/saved`);
        if (draft.data?.inputText) setInputText(draft.data.inputText);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTask();
  }, [id]);

  const handleSave = async () => {
    if (!inputText.trim()) return alert('Please type something before saving.');
  
    try {
      const res = await axios.post(`/user/tasks/${task._id}/save`, { inputText });
  
      const { accuracy, plagiarism, message } = res.data;
  
      setAccuracy(accuracy);
      setIsEditable(false);
  
      if (accuracy < 80) {
        alert(`⚠️ Task saved with accuracy ${accuracy}%. You can edit later to improve it.`);
      } else {
        alert(`✅ Task saved successfully! `);
      }
  
      if (plagiarism) {
        console.warn('Plagiarism Detected:', plagiarism);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save task');
    }
  };
  

  const handleClose = () => navigate('/dashboard/start-work');

  if (loading) return <CircularProgress />;
  if (!task) return <Typography>Task not found.</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Page {task.pageName}</Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Task Display */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Task Content</Typography>
            <Box
              sx={{
                height: 450, overflowY: 'auto', backgroundColor: '#fafafa',
                border: '1px solid #ccc', p: 2, borderRadius: 1
              }}
            >
              {task.type === 'image' ? (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/uploads/${task.filename}`}
                  alt={task.pageName}
                  style={{ width: '100%' }}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
              ) : (
                <Typography sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                  {task.content}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* User Input */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>Enter the Text here :</Typography>
            <TextField
              multiline fullWidth rows={20}
              placeholder="Start typing here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={!isEditable}
              sx={{ backgroundColor: '#fff' }}
              inputProps={{ spellCheck: false, autoComplete: 'off' }}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" onClick={() => setIsEditable(true)} disabled={isEditable}
            sx={{ backgroundColor: '#00bcd4', width: 100 }}>EDIT</Button>
          <Button variant="contained" onClick={handleSave} disabled={!isEditable}
            sx={{ backgroundColor: '#90a4ae', width: 100 }}>SAVE</Button>
          <Button variant="contained" color="info" onClick={handleClose}
            sx={{ backgroundColor: '#00bcd4', width: 100 }}>CLOSE</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskEditor;
