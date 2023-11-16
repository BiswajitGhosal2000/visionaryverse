import React, { useState } from 'react';
import BlogContext from './BlogContext';

const BlogState = (props) => {
    const host = "http://127.0.0.1:5000"
    const [blogs, setBlogs] = useState([])

    // Get all blogs
    const getAllBlogs = async () => {
        const url = `${host}/api/blogs/getallblogs`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            // setBlogs(json.blogs);
            return json.blogs;
        } catch (error) {
            console.error(error);
        }
    }
    // Get all blogs of a user
    const getUserBlogs = async () => {
        const url = `${host}/api/blogs/getuserblogs`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            return json.blogs;
        } catch (error) {
            console.error(error);
        }
    }

    // view a blog
    const viewBlog = async (id) => {
        const url = `${host}/api/blogs/viewblog/${id}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            return json.blog;
        } catch (error) {
            console.error(error);
        }
    }

    // Create a blog
    const createBlog = async (blog) => {
        const url = `${host}/api/blogs/createblog`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(blog)
            });
            const json = await response.json();
            setBlogs([...blogs, json.blog]);
            console.info({ message: "Blog created successfully", title: json.blog.title });
        } catch (error) {
            console.error(error);
        }
    }

    // Update a blog
    const updateBlog = async (blog) => {
        const url = `${host}/api/blogs/updateblog/${blog.id}`;
        console.log(url)
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(blog)
            });
            const json = await response.json();
            setBlogs([...blogs, json.blog]);
            console.info({ message: "Blog updated successfully", title: json.blog.title });
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }

    return (
        <BlogContext.Provider value={{ blogs, getAllBlogs, getUserBlogs, createBlog, viewBlog, updateBlog }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;