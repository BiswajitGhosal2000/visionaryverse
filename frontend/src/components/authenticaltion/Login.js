import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@mui/material';
import AuthContext from '../../context/auth/AuthContext';
import Popup from '../User/Popup';

function Login() {
    const [credential, setCredential] = useState({
        email: '',
        password: '',
    });
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        e.preventDefault();
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(credential.email, credential.password);
        if (success) {
            setOpen(true);
            setSeverity('success');
            setMessage('Login successful');
            navigate('/');
        } else {
            setOpen(true);
            setMessage('Login failed');
            setSeverity('error');
        }
    };
    document.title = 'Login || Blog';

    return (
        <Container maxWidth="sm" style={{ border: '1px solid #ccc', padding: '5rem', borderRadius: '5px', marginTop: '5rem' }}>
            <Popup severity={severity} open={open} message={message} />
            <Typography variant="h4" align="center" color="primary">
                Login!
            </Typography>
            <form onSubmit={handleSubmit} >
                <TextField fullWidth label="Email address" variant="standard" margin="normal" name="email" type="email" value={credential.email} onChange={handleChange} required />
                <TextField fullWidth label="Password" variant="standard" margin="normal" name="password" type="password" autoComplete="true" value={credential.password} onChange={handleChange} required />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>
            <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>
                Create a new account <Link to="/signup">Signup</Link>
            </Typography>
        </Container>
    );
}

export default Login;
