import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function Popup(props) {
    const [isOpen, setOpen] = React.useState(true);
    React.useEffect(() => {
        setOpen(props.open)
    }, [props.open])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default Popup