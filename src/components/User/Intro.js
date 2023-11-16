import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthContext from '../../context/auth/AuthContext';

export default function Intro() {
    const { user } = React.useContext(AuthContext);
    return (
        <Box sx={{ minWidth: 200, maxWidth: 300, overflow: "scroll", maxHeight: "85vh" }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardHeader title={user.name} subheader="" />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            Visionary Verse is a platform for bloggers to share their thoughts and ideas with the world.
                        </Typography>
                        <Typography variant="h5" component="div">

                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="inherit">

                        </Typography>
                        <Typography variant="body2">

                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}