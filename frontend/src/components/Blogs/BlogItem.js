import { Link } from 'react-router-dom';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareBlog from './ShareBlog';
import MoreOption from './MoreOption';
import Comment from './Comment';
import { useContext } from 'react';
import BlogContext from '../../context/blog/BlogContext';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function BlogItem(props) {
    const { blog } = props;
    const author = blog.author[0].name
    const [expanded, setExpanded] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const { addComment } = useContext(BlogContext);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = e.target[0].value;
        const res = await addComment(blog._id, comment);
        setComment("");
        console.log(res);
    }
    React.useEffect(() => {

        // eslint-disable-next-line
    }, [blog])

    return (
        <Card sx={{ maxWidth: 1000, bgcolor: "#1D2226", color: "white" }} style={{ marginTop: "1rem", width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" alt={author} src={blog.author[0].profileImage}>
                        {author.length > 0 ? author.substring(0, 1) : ""}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreOption blog={blog} />
                    </IconButton>
                }
                title={author}
                subheader={
                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="grey" >
                        Published on: {blog.date}
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant="body2" color="inherit">
                    {blog.contentImg ? blog.content.substring(0, 100) : blog.content.substring(0, 500)}<Link to={`/viewblog/${blog._id}`} aria-label='Read the full blog using this button'>Read Full Blog</Link>
                </Typography>
            </CardContent>
            <CardMedia component="img" height="300" image={blog.contentImg} hidden={blog.contentImg ? false : true} alt={blog.title.substring(0, 50)} />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: "white" }} />
                </IconButton>
                < ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" >
                    <CommentIcon sx={{ color: "white" }} />
                </ ExpandMore>
                <IconButton aria-label="share">
                    <ShareBlog blog={blog} sx={{ color: "white" }} />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="comment" placeholder="Add a comment" onChange={handleChange} value={comment} />
                    <button type="submit">Submit</button>
                </form>
                {blog.comments ?
                    blog.comments.map((comment) => {
                        return <Comment key={comment._id} comment={comment} />;
                    }) : <Typography sx={{ color: "white" }} variant="body2" component="p">No Comments</Typography>}
            </Collapse>
        </Card >
    );
}