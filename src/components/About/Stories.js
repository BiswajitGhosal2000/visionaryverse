import React from 'react';
import { Container, Grid, Typography, Paper, Card, CardContent, CardMedia } from '@mui/material';



function Stories() {

    return (
        <Container sx={{ my: 5 }}>
            <Typography variant="h4" align="center" sx={{ my: 3 }}>
                Blogger Stories
            </Typography>

            <Paper component={Grid} container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card >
                        <CardMedia

                            component="img"
                            alt="Blog Image"
                            height="200"
                            image="https://pepperstormmedia.com/wp-content/uploads/2017/08/blog-2355684_960_720.jpg"
                        />
                        <CardContent >
                            <Typography variant="h5" component="div">
                                Title
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur corrupti natus aperiam nam, veritatis at culpa libero tempore, commodi modi ducimus eaque accusantium iste animi magni ad. Corporis, itaque aspernatur!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card >
                        <CardContent >
                            <Typography variant="h5" component="div">
                                Title
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur pariatur magni quasi ipsa quam recusandae! Fuga impedit facilis alias repellendus facere ab quibusdam libero, eligendi accusamus error sed voluptates excepturi!
                            </Typography>
                        </CardContent>
                        <CardMedia

                            component="img"
                            alt="Blog Image"
                            height="200"
                            image="https://content-writing-india.com/blog/wp-content/uploads/2018/03/1080px.jpg"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card >
                        <CardContent >
                            <Typography variant="h5" component="div">
                                Title
                            </Typography>
                            <Typography>
                                A blog is a type of website or section of a website that features regularly updated content, often in the form of written articles or posts. Blogs can cover a wide range of topics, from personal experiences and opinions to news and analysis on specific industries or fields.
                            </Typography>
                        </CardContent>
                        <CardMedia

                            component="img"
                            alt="Blog Image"
                            height="200"
                            image="https://www.tailorbrands.com/wp-content/uploads/2021/06/Header-Minimalist-logos.jpg"
                        />
                    </Card>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Stories;
