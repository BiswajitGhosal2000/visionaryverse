import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import BlogContext from '../../context/blog/BlogContext';
import AuthContext from '../../context/auth/AuthContext';

function ViewBlog() {
    const blogImg = "https://img.freepik.com/premium-photo/how-start-blog-blogging-beginners-ways-monetize-your-blog-blog-word-table-with-laptop_72482-5630.jpg";
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const { getUserById } = useContext(AuthContext);
    const [author, setAuthor] = useState("")
    const { viewBlog } = useContext(BlogContext);

    useEffect(() => {
        // Fetch the blog post using the `id` parameter
        async function getData() {
            const blog = await viewBlog(id);
            setBlog(blog);
            const writer = await getUserById(blog.user);
            setAuthor(writer.name);
        }
        getData();
        document.title = blog.title + " || " + blog.tag;
        // eslint-disable-next-line
    }, [viewBlog, id, blog]);

    return (
        <div className='container my-5'>
            <div className="row">
                <h2 className='text-center col-md-12'>{blog.title}</h2>
                <div className=" col-md-9">
                    <div className="card-body">
                        <img src={blogImg} className="card-img-top rounded" alt="..." height={400} />
                        <div className=" mx-2 ">
                            <blockquote>{blog.content}</blockquote>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header bg-dark">
                            <h5 className="card-title bg-dark">About The Blog</h5>
                        </div>
                        <div className="card-body">
                            <h5 className="card-text">Author:  {author}</h5>
                            <small >Last updated: {blog.date}</small>
                            <p >Tag : {blog.tag}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBlog;