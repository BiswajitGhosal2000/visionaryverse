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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareBlog from './ShareBlog';
import MoreOption from './MoreOption';



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
    React.useEffect(() => {

        // eslint-disable-next-line
    }, [blog])
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                title={blog.title}
                subheader={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="grey"
                        >
                            Published on: {blog.date}
                        </Typography>
                    </React.Fragment>
                }
                sx={{ color: "inherit", borderBottom: "1px solid #007FFF" }}
            />
            <CardContent>
                <Typography variant="body2" color="inherit">
                    {blog.contentImg ? blog.content.substring(0, 100) : blog.content.substring(0, 500)}<Link to={`/viewblog/${blog._id}`} aria-label='Read the full blog using this button'>Read Full Blog</Link>
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                height="fit-content"
                width="parent"
                image={blog.contentImg}
                hidden={blog.contentImg ? false : true}
                alt={blog.title.substring(0, 50)}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareBlog blog={blog} sx={{ color: "white" }} />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon sx={{ color: "white" }} />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{blog.content}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}