import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

export default function Comment(props) {
    const comments = props.comments || [];

    React.useEffect(() => {

    }, []);

    return (
        <Box sx={{ pb: 5 }}>
            {/* <CssBaseline /> */}
            <List>
                {comments.map(({ primary, secondary, person }, index) => (
                    <ListItem key={index + person}>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture" src={person} />
                        </ListItemAvatar>
                        <ListItemText primary={primary} secondary={secondary} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}