import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

function Signup() {
    const { signup } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const signUP = (e) => {
        e.preventDefault();
        signup(credentials.name, credentials.email, credentials.password);
        setCredentials({ name: '', email: '', password: '', cpassword: '' });
        navigate('/');
    }

    useEffect(() => {
        document.title = 'SignUp || Visionary Verse';
    }, []);

    return (
        <Container maxWidth="sm" style={{ border: '1px solid #ccc', padding: '5rem', borderRadius: '5px', marginTop: '5rem' }} align="center">
            <Typography variant="h4" align="center" color="primary" gutterBottom>
                SignUp!
            </Typography>
            <form onSubmit={signUP}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField label="Name" name="name" fullWidth variant="standard"
                            value={credentials.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            variant="standard"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Password"
                            name="password"
                            fullWidth
                            type="password"
                            variant="standard"
                            autoComplete="true"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Confirm Password"
                            name="cpassword"
                            fullWidth
                            type="password"
                            variant="standard"
                            autoComplete="true"
                            value={credentials.cpassword}
                            onChange={handleChange}
                            required
                            error={credentials.password !== credentials.cpassword}
                            helperText={credentials.password !== credentials.cpassword ? 'Password does not match' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Sign in
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Typography variant="body2" align="center">
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </Container>
    );
}

export default Signup;