
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import Blogs from './Blogs/Blogs';
import Intro from './User/Intro';
import Sidebar from './Sidebar';


export default function Home() {
    const navigate = useNavigate();
    React.useEffect(() => {
        document.title = "Home";
        if (localStorage.getItem('token') === null) {
            navigate('/login');
        }
    }, [navigate]);
    return (
        <React.Fragment>
            <CssBaseline />
            <Container sx={{ my: 2 }} maxWidth="lg" style={{ display: "flex", justifyContent: 'space-between' }}>
                <Intro />
                < Blogs />
                <Sidebar />
            </Container>
        </React.Fragment>
    );
}