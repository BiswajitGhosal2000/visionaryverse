import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TablePagination, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

import UserBlogItem from './UserBlogItem';
import AddBlog from './AddBlog';
import BlogContext from '../../context/blog/BlogContext';
import UserBlogItemSkeleton from '../Skeletons/UserBlogItemSkeleton';

function UserBlog() {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { getUserBlogs } = useContext(BlogContext);
    const [loading, setLoading] = useState(true);
    let serial = 1;
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
            setLoading(false);
        } else {
            navigate('/login');
        }
    }, [navigate, getUserBlogs]);

    return (
        <Container>
            <div className='d-flex justify-content-between my-3'>
                <Typography variant="h5" component="div">Your Blogs</Typography>
                <AddBlog />
            </div>
            {loading ? (
                <UserBlogItemSkeleton />
            ) : (
                <Paper elevation={3} sx={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Blog Id</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Content</TableCell>
                                <TableCell>Tag</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((blog) => {
                                const currentSerial = serial++; // Calculate the serial once
                                return <UserBlogItem key={blog._id} blog={blog} serial={currentSerial} />;
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={blogs.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
        </Container>
    );
}

export default UserBlog;


