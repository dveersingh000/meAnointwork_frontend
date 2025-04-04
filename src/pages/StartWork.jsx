import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Select, MenuItem, TextField, Paper, CircularProgress, Snackbar, Alert
} from '@mui/material';
import axios from '../utlis/axios';
import { useNavigate } from 'react-router-dom';

const StartWork = () => {
  const [tasks, setTasks] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/user/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const handleSubmitAll = async () => {
    if (!window.confirm('Are you sure you want to submit all tasks? Once submitted, they cannot be edited.')) return;

    setLoading(true);
    try {
      const res = await axios.post('/user/submit-all');
      setAlert({ open: true, message: res.data.message, severity: 'success' });
    } catch (err) {
      setAlert({
        open: true,
        message: err?.response?.data?.message || 'Submission failed',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered = tasks.filter((row) =>
    row.pageName.toString().includes(search)
  );

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Box>
      {/* Submit Button */}
      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#00bcd4', fontWeight: 'bold' }}
          onClick={handleSubmitAll}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'SUBMIT WORK'}
        </Button>
      </Box>

      {/* Table + Filters */}
      <Paper elevation={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ borderBottom: '1px solid #ccc' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Show</Typography>
            <Select
              size="small"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(+e.target.value);
                setPage(0);
              }}
            >
              {[10, 25, 50, 100].map((num) => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
            <Typography>entries</Typography>
          </Box>

          <TextField
            size="small"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </Box>

        {/* Header Row */}
        <Box sx={{
          backgroundColor: '#f44336',
          color: '#fff',
          px: 2,
          py: 1,
          display: 'flex',
          fontWeight: 'bold',
        }}>
          <Box flex={1}>S.NO</Box>
          <Box flex={2}>PAGE NAME</Box>
          <Box flex={2}>ACTION</Box>
        </Box>

        {/* Task Rows */}
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {paginated.map((task, idx) => (
            <Box
              key={task._id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1,
                backgroundColor: idx % 2 === 0 ? '#f9fcff' : '#e8f4ff',
                borderBottom: '1px solid #e0e0e0'
              }}
            >
              <Box flex={1}>{page * rowsPerPage + idx + 1}</Box>
              <Box flex={2}>{task.pageName}</Box>
              <Box flex={2}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: '#00bcd4', fontWeight: 'bold' }}
                  onClick={() => navigate(`/dashboard/start-work/${task._id}`)}
                >
                  START WORK
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Pagination */}
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ borderTop: '1px solid #ccc' }}>
          <Typography>
            Showing {page * rowsPerPage + 1} to{' '}
            {Math.min((page + 1) * rowsPerPage, filtered.length)} of{' '}
            {filtered.length} entries
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            {[...Array(totalPages).keys()].slice(0, 5).map((pg) => (
              <Button
                key={pg}
                size="small"
                variant={pg === page ? 'contained' : 'outlined'}
                onClick={() => handlePageChange(pg)}
              >
                {pg + 1}
              </Button>
            ))}
            <Button
              size="small"
              variant="outlined"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages - 1}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Snackbar Feedback */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StartWork;
