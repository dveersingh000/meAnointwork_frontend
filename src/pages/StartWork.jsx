import React, { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    TextField,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const dummyData = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    pageName: 6000 + i + 1
}));

const StartWork = () => {
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const filtered = dummyData.filter((row) =>
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
                <Button variant="contained" sx={{ backgroundColor: '#00bcd4', fontWeight: 'bold' }}>
                    SUBMIT WORK
                </Button>
            </Box>

            <Paper elevation={3}>
                {/* Top Controls */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                    sx={{ borderBottom: '1px solid #ccc' }}
                >
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

                {/* Table Header */}
                <Box
                    sx={{
                        backgroundColor: '#f44336',
                        color: '#fff',
                        px: 2,
                        py: 1,
                        display: 'flex',
                        fontWeight: 'bold',
                    }}
                >
                    <Box flex={1}>S.NO</Box>
                    <Box flex={2}>PAGE NAME</Box>
                    <Box flex={2}>ACTION</Box>
                </Box>

                {/* Scrollable Table Content */}
                <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    {paginated.map((row, idx) => (
                        <Box
                            key={row.id}
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
                            <Box flex={2}>{row.pageName}</Box>
                            <Box flex={2}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{ backgroundColor: '#00bcd4', fontWeight: 'bold' }}
                                    onClick={() => navigate(`/dashboard/start-work/${row.pageName}`)}
                                >
                                    START WORK
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Bottom Pagination Info */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                    sx={{ borderTop: '1px solid #ccc' }}
                >
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
        </Box>
    );
};

export default StartWork;
