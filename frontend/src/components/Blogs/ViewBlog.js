import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardHeader, CardContent, CardMedia, Avatar, Grid, Paper, BottomNavigationAction, BottomNavigation, Divider } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import IconButton from "@mui/material/IconButton";

import BlogContext from "../../context/blog/BlogContext";
import AuthContext from "../../context/auth/AuthContext";
import Comment from "./Comment";
import MoreOption from "./MoreOption";


function ViewBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [author, setAuthor] = useState({
        name: "",
        profileImage: "",
        role: "",
        email: ""
    });
    const { getUserById } = useContext(AuthContext);
    const { viewBlog } = useContext(BlogContext);
    document.title = blog.tag + " || " + blog.title;

    useEffect(() => {
        // Fetch the blog post using the `id` parameter
        async function getData() {
            const blogData = await viewBlog(id);
            setBlog(blogData);
            const writer = await getUserById(blogData.user);
            setAuthor(writer);
        }
        getData();

        // eslint-disable-next-line
    }, [id]);

    return (
        <Grid container padding={3}>
            <Grid item xs={8}>
                <Card className="bg-dark text-white">
                    <CardMedia
                        component="img"
                        alt={blog.title}
                        height="400"
                        image={blog.contentImg}
                        padding={3}
                        className="p-3"
                    />
                    <CardContent sx={{ overflow: "scroll", maxHeight: "50vh" }}>
                        <Typography variant="body1">{blog.content}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader
                        title={author.name}
                        titleTypographyProps={{ variant: "h5", color: "primary", fontWeight: "bold" }}
                        subheader={author.role}
                        subheaderTypographyProps={{ variant: "h6", color: "secondary" }}
                        className="bg-dark"
                        avatar={<Avatar alt="Author Avatar" src={author.profileImage} sx={{ width: 50, height: 50 }} />}
                        action={
                            <IconButton aria-label="settings">
                                <MoreOption blog={blog} />
                            </IconButton>}
                    />
                    <CardContent className="bg-dark text-white">
                        <Typography variant="h5" paragraph>
                            {blog.tag}   ||    {blog.title}
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Last Updated: {blog.date}
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        {blog.comments ?
                            blog.comments.map((comment) => {
                                return <Comment key={comment._id} comment={comment} />;
                            }) : <Typography variant="body2" component="p">No Comments</Typography>}
                    </CardContent>
                </Card>
                <Paper elevation={3}>
                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    </BottomNavigation>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ViewBlog;
