import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Input } from '@mui/material';
import AuthContext from '../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const { updateUser, getUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: '', email: '', role: '', profileImage: null });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleImageChange = (e) => {
        setCredentials({ ...credentials, profileImage: e.target.files[0] });
    };


    const updateUserInfo = (e) => {
        e.preventDefault();
        updateUser(credentials);
        navigate('/userProfile')
    }
    useEffect(() => {
        async function getUserInfo() {
            const response = await getUser();
            setCredentials((prevState) => ({
                ...prevState,
                name: response.name,
                role: response.role,
                email: response.email,
                profileImage: response.profileImage
            }));
        }
        getUserInfo();
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="sm" style={{ border: '1px solid #ccc', padding: '5rem', borderRadius: '5px', marginTop: '2rem' }} align="center">
            <img src={credentials.profileImage} alt="profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <Typography variant="h4" align="center" color="primary" gutterBottom>
                Profile
            </Typography>
            <form onSubmit={updateUserInfo}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField label="Name" name="name" fullWidth variant="standard" value={credentials.name} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" name="email" fullWidth variant="standard" value={credentials.email} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Role" name="role" fullWidth variant="standard" value={credentials.role} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Input label="profileImage" name="profileImage" fullWidth type="file" onChange={handleImageChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="error" fullWidth onClick={() => navigate('/userProfile')}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" color="primary" fullWidth >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Profile;
