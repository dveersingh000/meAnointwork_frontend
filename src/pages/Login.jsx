import React, { useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    Container,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(https://me.anointwork.com/bgimg.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            {/* Bluish overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 50, 0.3)',
                    zIndex: 1,
                }}
            />

            {/* Form Container */}
            <Container
                maxWidth="xs"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                    sx={{
                        color: '#f2cd9e',
                        mb: 3,
                        fontSize: '2.5rem',
                    }}
                >
                    Have an account?
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: '100%' }}
                >
                    <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        InputProps={{
                            sx: {
                                borderRadius: '40px',
                                backgroundColor: '#f0f4ff',
                                fontWeight: 'bold',
                                height: '60px',
                                fontSize: '1.1rem',
                                pl: 3,
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        required
                        InputProps={{
                            sx: {
                                borderRadius: '40px',
                                backgroundColor: '#f0f4ff',
                                fontWeight: 'bold',
                                height: '60px',
                                fontSize: '1.1rem',
                                pl: 3,
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 4,
                            py: 2,
                            borderRadius: '40px',
                            backgroundColor: '#ffcba4',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            '&:hover': {
                                backgroundColor: '#ffb88e',
                            },
                        }}
                    >
                        Login
                    </Button>
                </Box>

            </Container>
        </Box>
    );
};

export default Login;
