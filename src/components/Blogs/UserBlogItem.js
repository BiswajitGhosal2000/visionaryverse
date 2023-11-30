import React from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import {
    TableCell,
    TableRow,
    Link as MUILink,
    Button,
} from '@mui/material';

export default function UserBlogItem(props) {
    const { serial, blog } = props;

    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            <TableCell>{serial}</TableCell>
            <TableCell>
                <MUILink
                    component={Link}
                    to={`/viewblog/${blog._id}`}
                    color="textPrimary"
                    underline="none"
                    variant="body1"
                >
                    {blog.title}
                </MUILink>
            </TableCell>
            <TableCell>{blog.content.substring(0, 50)}</TableCell>
            <TableCell>{blog.tag}</TableCell>
            <TableCell>{blog.date}</TableCell>
            <TableCell><img src={blog.contentImg} alt={blog.title} height={100} width={100} /></TableCell>
            <TableCell>
                <MUILink
                    component={Link}
                    to={`/updateblog/${blog._id}`}
                    className="bg-dark"
                >
                    <Button variant="contained" color="primary" size="small">
                        <EditIcon />
                    </Button>
                </MUILink>
            </TableCell>
        </TableRow>
    );
}
