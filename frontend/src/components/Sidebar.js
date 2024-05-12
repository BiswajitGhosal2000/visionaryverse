import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

// import CardMedia from "@mui/material/CardMedia";
// import FormControl from "@mui/material/FormControl";
import TrendingItem from "./Blogs/TrendingItem";
import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import Toast from "./Toast";



function Trending() {
    return (
        <Card sx={{ mb: 2 }} variant="outlined">
            <CardHeader title="Trending" />
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", p: 2 }}>
                <TrendingItem />
                <TrendingItem />
                <TrendingItem />
            </List>
        </Card>
    )
};


export default function Sidebar() {

    const [email, setEmail] = React.useState("")
    const { contactInfo } = useContext(AuthContext);
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await contactInfo(email);
        if (res.error) {
            <Toast message={res.error} />
        } else {
            alert("Thank you for subscribing to our newsletter. Your provided Email Address is" + email);
        }
        setEmail("");
    }
    return (

        <Box sx={{ minWidth: 300, maxWidth: 500, overflow: "scroll", maxHeight: "100vh", bgcolor: "inherit" }}>
            <Trending />
            <Card sx={{ my: 2 }} variant="outlined">
                <CardHeader title="Subscribe to our newsletter" />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="inherit" gutterBottom>Get the latest news and updates from Visionary Verse</Typography>
                    <form onSubmit={handleSubmit} className="row">
                        <input type="email" className="form-control" name="email" placeholder="Enter your email" value={email} onChange={handleChange} required />
                        <Button type="submit" variant="contained" >Subscribe</Button>
                    </form>
                </CardContent>
                <CardActions>
                    <Button size="smal" variant="contained" href="/about">About Us</Button>
                </CardActions>
                <Typography variant="body2">
                    &copy; 2023-24 Visionary Verse. All rights reserved.
                </Typography>
            </Card>
        </Box>
    )
}