import React, { useState } from "react";
import BlogContext from "./BlogContext";

const BlogState = (props) => {
    const host = "http://127.0.0.1:5000"
    const [blogs, setBlogs] = useState([])

    // Get all blogs
    const getAllBlogs = async (page, limit) => {
        const url = `${host}/api/blogs/getallblogs?page=${page}&limit=${limit}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }
    // Get all blogs of a user
    const getUserBlogs = async () => {
        const url = `${host}/api/blogs/getuserblogs`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
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
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
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
        const formData = new FormData();
        formData.append("title", blog.title);
        formData.append("content", blog.content);
        formData.append("tag", blog.tag);
        formData.append("contentImg", blog.contentImg);
        // formData.append("date", Date.now());
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("token")
                },
                body: formData
            });
            const json = await response.json();
            setBlogs([...blogs, json.blog]);
            console.info({ message: "Blog created successfully", title: json.blog.title });
            return json;
        } catch (error) {
            console.error(error);
        }
    }

    // Update a blog
    const updateBlog = async (blog) => {
        const url = `${host}/api/blogs/updateblog/${blog.id}`;
        const formData = new FormData();
        formData.append("title", blog.title);
        formData.append("content", blog.content);
        formData.append("tag", blog.tag);
        formData.append("contentImg", blog.contentImg);
        // formData.append("date", Date.now());
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "auth-token": localStorage.getItem("token")
                },
                body: formData
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
    const addComment = async (id, comment) => {
        const blogId = id;
        const url = `${host}/api/blogs/addcomment/${blogId}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ comment })
            });
            const json = await response.json();
            console.log(json);
            return json;
        } catch (error) {
            console.error("BlogState: " + error);
        }
    }

    return (
        <BlogContext.Provider value={{ blogs, getAllBlogs, getUserBlogs, createBlog, viewBlog, updateBlog, addComment }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;