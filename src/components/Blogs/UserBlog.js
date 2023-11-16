import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

import UserBlogItem from './UserBlogItem';
import AddBlog from './AddBlog';
import BlogContext from '../../context/blog/BlogContext';

function UserBlog() {
    const [blogs, setBlogs] = useState([]);
    const { getUserBlogs } = useContext(BlogContext);
    let serial = 1;
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "User's Blog";
        const fetchBlogs = async () => {
            try {
                const fetchedBlogs = await getUserBlogs();
                setBlogs(fetchedBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        if (localStorage.getItem('token')) {
            fetchBlogs();
        } else {
            navigate('/login');
        }
    }, [navigate, getUserBlogs]);

    return (
        <Container maxWidth="lg" style={{ minHeight: "80vh" }}>
            <div className='d-flex justify-content-between my-3'>
                <Typography variant="h5" component="div">Your Blogs</Typography>
                <AddBlog />
            </div>

            {blogs.length === 0 ? (
                <Typography variant="body1">No Blogs Found</Typography>
            ) : (
                <Paper elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Blog Id</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Content</TableCell>
                                <TableCell>Tag</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogs.map((blog) => {
                                const currentSerial = serial++; // Calculate the serial once
                                return <UserBlogItem key={blog._id} blog={blog} serial={currentSerial} />;
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Container>
    );
}

export default UserBlog;
