import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Paper
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const TaskEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(true);
  const [inputText, setInputText] = useState('');

  // Dummy paragraph – replace with API call later
  const [taskText] = useState(
    `Above the floor still hovered the thin gray cloud... [Full paragraph here]`
  );

  const handleSave = () => {
    alert(`Saved text for page ${id}:\n${inputText}`);
    // TODO: Save via API
  };

  const handleClose = () => {
    navigate('/dashboard/start-work');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Page {id}
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Left Paragraph */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: 400,
                overflowY: 'auto',
                p: 2,
                backgroundColor: '#fafafa',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                border: '1px solid #ccc',
                borderRadius: 1
              }}
            >
              {taskText}
            </Box>
          </Grid>

          {/* Right Input */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Enter the Text here :
            </Typography>

            <TextField
              multiline
              fullWidth
              rows={18}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Start typing..."
              disabled={!isEditable}
              sx={{ backgroundColor: '#fdfdfd' }}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            onClick={() => setIsEditable(true)}
            sx={{ backgroundColor: '#00bcd4', width: 100 }}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ backgroundColor: '#90a4ae', width: 100 }}
          >
            SAVE
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={handleClose}
            sx={{ backgroundColor: '#00bcd4', width: 100 }}
          >
            CLOSE
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskEditor;
