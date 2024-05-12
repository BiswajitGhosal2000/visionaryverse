import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";
import BlogContext from "../../context/blog/BlogContext";

function UpdateBlog() {
    const { id } = useParams();
    const { viewBlog, updateBlog } = useContext(BlogContext);
    const navigate = useNavigate();

    const [ublog, setUBlog] = useState({
        id: "",
        title: "",
        content: "",
        tag: "",
        contentImg: null
    });

    const handleChange = (e) => {
        setUBlog({ ...ublog, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setUBlog({ ...ublog, contentImg: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        ublog.id = id;
        const res = await updateBlog(ublog);
        if (res) {
            navigate("/userblog");
        }
    };

    useEffect(() => {
        const setData = async () => {
            const blog = await viewBlog(id);
            setUBlog({
                id: id,
                title: blog.title,
                content: blog.content,
                tag: blog.tag,
                contentImg: blog.contentImg
            });
        };
        setData();
    }, [id, viewBlog]);

    return (
        <Container maxWidth="md">
            <h1 className="text-center">Update Blog!</h1>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Title"
                        id="title"
                        name="title"
                        variant="standard"
                        onChange={handleChange}
                        value={ublog.title}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal" variant="standard">
                    <InputLabel htmlFor="tag">Tag</InputLabel>
                    <Select
                        label="Tag"
                        id="tag"
                        name="tag"
                        value={ublog.tag}
                        onChange={handleChange}
                    >
                        <MenuItem value="General">Select Tag Here</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Technology">Technology</MenuItem>
                        <MenuItem value="Politics">Politics</MenuItem>
                        <MenuItem value="Science">Science</MenuItem>
                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                        <MenuItem value="Health">Health</MenuItem>
                        <MenuItem value="Travel">Travel</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Fashion">Fashion</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                    </Select>
                </FormControl>
                <InputLabel htmlFor="content">Content</InputLabel>
                <FormControl fullWidth margin="normal" variant="standard">
                    <TextareaAutosize
                        minRows={6}
                        maxRows={15}
                        id="content"
                        name="content"
                        onChange={handleChange}
                        value={ublog.content}
                        minLength={5}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <img src={ublog.contentImg} alt="Blog" />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Image"
                        id="image"
                        name="image"
                        variant="standard"
                        type="file"
                        onChange={handleImageChange}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Update Blog
                    </Button>
                </FormControl>
            </form>
        </Container>
    );
}

export default UpdateBlog;
