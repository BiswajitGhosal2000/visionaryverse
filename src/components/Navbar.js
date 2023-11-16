import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import AuthContext from '../context/auth/AuthContext';
import logo from '../logo.png';
import { Logout } from '@mui/icons-material';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user, getUser } = React.useContext(AuthContext);

    const [userPresent, setUserPresent] = React.useState(localStorage.getItem('token')); // Initialize userPresent

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    React.useEffect(() => {
        async function getUserDetails() {
            await getUser();
            const userPresent = localStorage.getItem('token');
            // Update userPresent when getUserDetails is called
            setUserPresent(userPresent);
        }

        const userPresent = localStorage.getItem('token');
        if (userPresent) {
            getUserDetails();
        }
    }, [userPresent, getUser]);


    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h5" noWrap component="a" href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '0rem',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={logo} alt="" width={30} height={30} />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />

                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem >
                                <Typography sx={{ color: 'black', textDecoration: "none" }} textAlign="center" variant="h5" noWrap component="a" href='/userblog'>My Blog</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography sx={{ color: 'black', textDecoration: "none" }} textAlign="center" variant="h5" noWrap component="a" href="/about">About</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 200,
                            letterSpacing: '0rem',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={logo} alt="" width={30} height={30} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Typography sx={{ color: 'white', textDecoration: "none", mx: 1 }} textAlign="center" variant="h6" noWrap component="a" href='/userblog'>My Blog</Typography>
                        <Typography sx={{ color: 'white', textDecoration: "none", mx: 1 }} textAlign="center" variant="h6" noWrap component="a" href="/about">About</Typography>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user.name} src={`${process.env.PUBLIC_URL}/assets/teammember1.webp`} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Typography variant="h6" component="h6" sx={{ mt: 2 }}> Welcome,</Typography>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" >{user.name}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" >{user.email}</Typography>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <Typography textAlign="center" >logout <Logout /></Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;