import React from "react";
import { Container, Grid, Typography, Card, CardMedia } from "@mui/material";


function Vision() {

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography variant="p" component="div" className="p-3">
                        We believe in the power of words. We believe that words can change the world.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas cum deserunt temporibus exercitationem reprehenderit harum nulla.
                        Voluptate, quas non molestias ipsam tempora, debitis, numquam quos explicabo voluptatum sunt possimus iure.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia voluptate sequi rem consequatur eum quis ab dolores assumenda mollitia.
                        Consequatur nam commodi vitae quae hic rem ab quo voluptatum ipsam. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Minima sunt magni ipsa expedita sapiente odio minus eaque maxime, eius facere vel ad distinctio facilis libero sed rerum illum. Voluptates, incidunt!
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card >
                        <CardMedia
                            component="img"
                            alt="Moto"
                            height="500"
                            image="https://bcassetcdn.com/public/blog/wp-content/uploads/2022/06/24235214/Header-Minimalist-Logos-for-Impactful-Design.png"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card >
                        <CardMedia
                            component="img"
                            alt="Mission"
                            height="300"
                            image="https://www.tailorbrands.com/wp-content/uploads/2021/06/Header-Minimalist-logos.jpg"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="p" component="div" className="p-3">
                        We believe in the power of words. We believe that words can change the world.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas cum deserunt temporibus exercitationem reprehenderit harum nulla.
                        Voluptate, quas non molestias ipsam tempora, debitis, numquam quos explicabo voluptatum sunt possimus iure.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia voluptate sequi rem consequatur eum quis ab dolores assumenda mollitia.
                        Consequatur nam commodi vitae quae hic rem ab quo voluptatum ipsam. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Minima sunt magni ipsa expedita sapiente odio minus eaque maxime, eius facere vel ad distinctio facilis libero sed rerum illum. Voluptates, incidunt!
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Vision;
