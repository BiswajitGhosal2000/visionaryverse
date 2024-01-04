import * as React from 'react';
import { useContext, useEffect, useState } from 'react'
import BlogItem from './BlogItem';
import BlogContext from '../../context/blog/BlogContext';
import { Box } from '@mui/system';
import AddBlog from './AddBlog';
import { Avatar } from '@mui/material';
import AuthContext from '../../context/auth/AuthContext';
import BlogItemSkeleton from '../Skeletons/BlogItemSkeleton';
import InfiniteScroll from "react-infinite-scroll-component";

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const { getAllBlogs } = useContext(BlogContext);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    useEffect(() => {
        async function getBlogs() {
            const result = await getAllBlogs(page, 10);
            // console.log(result)
            setBlogs(result.blogs);
            setLoading(false);
            setTotalResult(result.totalResults);
        }
        getBlogs();
        // eslint-disable-next-line
    }, []);
    const fetchMoreData = async () => {
        try {
            const result = await getAllBlogs(page + 1, 10);

            setPage(page + 1);
            setBlogs((prevBlogs) => [...prevBlogs, ...result.blogs]); // Concatenate arrays correctly
            setTotalResult(result.totalResults);
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };

    return (
        <Box sx={{ minWidth: 600, overflow: "scroll", maxHeight: "100vh" }} >
            <Box sx={{ minWidth: 500, bgcolor: "#1D2226", mx: 2, display: "flex", p: 2 }}>
                <Avatar alt={user.name} src={user.profileImage} sx={{ mr: 3 }} />
                <AddBlog sx={{ color: "white" }} />
            </Box>
            <InfiniteScroll
                dataLength={blogs.length}
                next={fetchMoreData}
                hasMore={blogs.length <= totalResult}
                loader={<><BlogItemSkeleton /><BlogItemSkeleton /></>}
            >
                <Box sx={{ minWidth: 500 }} style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                    {blogs.map((blog) => (
                        <BlogItem key={blog._id} blog={blog} loading={loading} />
                    ))}
                </Box>
            </InfiniteScroll>
        </Box>
    );
}

export default Blogs

