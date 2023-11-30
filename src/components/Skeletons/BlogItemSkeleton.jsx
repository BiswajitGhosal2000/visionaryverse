import React from 'react';
import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';


function BlogItemSkeleton() {
    return (
        <Card sx={{ maxWidth: 1000, bgcolor: "#1D2226", color: "white" }} style={{ marginTop: "1rem", width: "100%" }}>
            <CardHeader
                avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                // action={ }
                title={<Skeleton animation="wave" height={30} width="80%" style={{ marginBottom: 2 }} />}
                subheader={<Skeleton animation="wave" height={20} width="40%" />}
            />
            <CardContent>
                <React.Fragment>
                    <Skeleton animation="wave" height={20} style={{ marginBottom: 2 }} />
                    <Skeleton animation="wave" height={20} style={{ marginBottom: 2 }} />
                </React.Fragment>
            </CardContent>
            <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" color="white" />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Skeleton animation="wave" height={50} width={60} style={{ marginBottom: 5 }} />
                <Skeleton animation="wave" height={50} width={60} style={{ marginBottom: 5 }} />
                <Skeleton animation="wave" height={50} width={60} style={{ marginBottom: 5 }} />
            </CardActions>
        </Card >
    )
}

export default BlogItemSkeleton