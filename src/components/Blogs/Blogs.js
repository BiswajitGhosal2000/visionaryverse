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
    const { getUser } = useContext(AuthContext);
    const [user, setUser] = useState({ name: "", email: "", role: "", profileImage: null });
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        async function getUserDetails() {
            const res = await getUser();
            setUser({
                name: res.name,
                email: res.email,
                role: res.role,
                profileImage: res.profileImage,
            });
        }

        getUserDetails();
    }, [getUser]);


    useEffect(() => {
        async function getBlogs() {
            const result = await getAllBlogs();
            setBlogs(result);
            setLoading(false);
        }
        getBlogs();
        // eslint-disable-next-line
    }, [])
    return (
        <Box sx={{ minWidth: 600, overflow: "scroll", maxHeight: "100vh" }} >
            <Box sx={{ minWidth: 500, bgcolor: "#1D2226", mx: 2, display: "flex", p: 2 }}>
                <Avatar alt={user.name} src={user.profileImage} sx={{ mr: 3 }} />
                <AddBlog sx={{ color: "white" }} />
            </Box>
            <InfiniteScroll
                dataLength={blogs.length}
                next={getAllBlogs}
                hasMore={true}
                loader={<BlogItemSkeleton />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            />
            <Box sx={{ minWidth: 500 }} style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                {loading ?
                    (<React.Fragment>
                        <BlogItemSkeleton />
                        <BlogItemSkeleton />
                        <BlogItemSkeleton />
                    </React.Fragment>) :
                    blogs.map((blog) => {
                        return <BlogItem key={blog._id} blog={blog} loading={loading} />
                    })
                }
            </Box>
        </Box>
    );
}

export default Blogs

