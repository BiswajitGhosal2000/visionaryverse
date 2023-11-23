import React, { useContext, useEffect } from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import AuthContext from '../../context/auth/AuthContext';


const Profile = ({ credentials }) => {
    const { getUser } = useContext(AuthContext);
    const [user, setUser] = React.useState({ name: '', email: '', role: '', profileImage: null });
    useEffect(() => {
        async function getUserInfo() {
            const response = await getUser();
            setUser((prevState) => ({
                ...prevState,
                name: response.name,
                role: response.role,
                email: response.email,
                profileImage: response.profileImage
            }));
        }
        getUserInfo();
        // eslint-disable-next-line
    }, [user]);
    return (
        <Container maxWidth="sm" style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '5px', marginTop: '2rem' }} align="center">
            <img src={user.profileImage} alt="profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <Typography variant="h4" align="center" color="primary" gutterBottom>
                {user.name}'s Profile
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Name:</strong> {user.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Role:</strong> {user.role}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Email:</strong> {user.email}
                    </Typography>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} href="/editprofile">
                Edit Profile
            </Button>
        </Container>
    );
};


export default Profile;

