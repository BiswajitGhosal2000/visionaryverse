import React, { useContext } from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import AuthContext from '../../context/auth/AuthContext';


const Profile = ({ credentials }) => {
    const { user } = useContext(AuthContext);

    return (
        <Container maxWidth="lg" style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '5px', marginTop: '2rem' }} align="center">
            <Grid container spacing={3}>
                {/* Left Column for Image */}
                <Grid item xs={12} md={6}>
                    <img src={user.profileImage} alt="profile" height={500} width={500} />
                </Grid>

                {/* Right Column for Details */}
                <Grid item xs={12} md={6}>
                    <Grid container >
                        <Grid item xs={12}>
                            <Typography variant="h4" color="primary">
                                {user.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" color="secondary">
                                <strong>Role:</strong> {user.role}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Email:</strong> {user.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} href="/editprofile">
                                Edit Profile
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};


export default Profile;

