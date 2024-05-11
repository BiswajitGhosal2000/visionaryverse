import React from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, styled } from '@mui/material';

const classes = styled('div')({
    root: {
        marginTop: "20px",
    },
    card: {
        display: 'flex',
    },
    cardContent: {
        flex: '1',
    },
    cardMedia: {
        width: 150,
    },
});


function Team() {

    return (
        <Container className={classes.root}>
            <Typography variant="h4" align="center">
                Team
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt="James M. McCoy"
                            image={`${process.env.PUBLIC_URL}/assets/teammember1.webp`}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h6">
                                James M. McCoy
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolorum beatae adipisci necessitatibus, delectus rem velit expedita optio, in laboriosam laborum quasi sit magnam voluptate quod nobis unde voluptatum quae?
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt="Team Member 2"
                            image={`${process.env.PUBLIC_URL}/assets/teammember2.jpg`}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h6">
                                John Doe
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolorum beatae adipisci necessitatibus, delectus rem velit expedita optio, in laboriosam laborum quasi sit magnam voluptate quod nobis unde voluptatum quae?
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt="Team Member 3"
                            image={`${process.env.PUBLIC_URL}/assets/teammember3.avif`}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h6">
                                Kayla W. Cowley
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolorum beatae adipisci necessitatibus, delectus rem velit expedita optio, in laboriosam laborum quasi sit magnam voluptate quod nobis unde voluptatum quae?
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Team;
