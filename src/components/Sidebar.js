import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

// import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import TrendingItem from './Blogs/TrendingItem';



function Trending() {
    return (
        <Card sx={{ mb: 2 }} variant='outlined'>
            <CardHeader title="Trending" />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 2 }}>
                <TrendingItem />
                <TrendingItem />
                <TrendingItem />
            </List>
        </Card>
    )
};

function NewsLetter() {
    const [email, setEmail] = React.useState("")
    const handleChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for subscribing to our newsletter. Your provided Email Address is" + email);
        setEmail('');
    }
    return (
        <React.Fragment>
            <Card sx={{ my: 2 }} variant='outlined'>
                <CardHeader title="Subscribe to our newsletter" />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="inherit" gutterBottom>Get the latest news and updates from Visionary Verse</Typography>
                    <FormControl onSubmit={handleSubmit} className='row'>
                        <input type="email" className="form-control" name="email" placeholder="Enter your email" value={handleChange} required />
                        <Button type="submit" variant='outlined' >Subscribe</Button>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button size="smal" variant='contained' href='/about'>About Us</Button>
                </CardActions>
                <Typography variant="body2">
                    &copy; 2023-24 Visionary Verse. All rights reserved.
                </Typography>
            </Card>
        </React.Fragment>
    )
};


export default function Sidebar() {
    // const bgcolor = localStorage.getItem('bgcolor');
    return (
        <Box sx={{ minWidth: 300, maxWidth: 500, overflow: "scroll", maxHeight: "85vh", bgcolor: "inherit" }}>
            <Trending />
            <NewsLetter />
        </Box>
    );
}