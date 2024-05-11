import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import AuthContext from '../context/auth/AuthContext';
import logo from '../logo.png';
import { Logout } from '@mui/icons-material';
import BookIcon from '@mui/icons-material/Book';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user, getUser } = React.useContext(AuthContext);

    const [userPresent, setUserPresent] = React.useState(false);
    const navigate = useNavigate();

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
        window.location.reload();
        setUserPresent(false);
    };


    React.useEffect(() => {
        const isUserPresent = localStorage.getItem('token') !== null;

        // Update userPresent only if it has changed
        if (userPresent !== isUserPresent) {
            async function getUserDetails() {
                await getUser();
            }
            getUserDetails();
            setUserPresent(isUserPresent);
        }
    }, [userPresent, getUser]);



    return (
        userPresent && (
            <AppBar position="static" >
                <Container maxWidth="xl" sx={{ marginRight: "5rem" }}>
                    <Toolbar disableGutters>
                        <Typography variant="h5" noWrap
                            sx={{
                                mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700,
                                letterSpacing: '0rem', textDecoration: 'none',
                            }}
                        >
                            <img src={logo} alt="" width={30} height={30} />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu}>
                                <MenuIcon />
                            </IconButton>
                            <Menu id="menu-appbar" anchorEl={anchorElNav}
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
                                sx={{ display: { xs: 'block', md: 'none' }, }}
                            >
                                <MenuItem >
                                    <IconButton color="inherit" component="a" onClick={() => navigate('/')} >
                                        <DynamicFeedIcon />
                                        <Typography sx={{ color: 'black', textDecoration: "none", mx: 1, }} textAlign="center" variant="body1" noWrap>
                                            Feed
                                        </Typography>
                                    </IconButton>
                                </MenuItem>
                                <MenuItem >
                                    <IconButton color="inherit" component="a" onClick={() => navigate('/userblog')}>
                                        <BookIcon />
                                        <Typography sx={{ color: 'black', textDecoration: "none", mx: 1 }} textAlign="center" variant="body1" noWrap>
                                            My Blog
                                        </Typography>
                                    </IconButton>
                                </MenuItem>
                                <MenuItem >
                                    <IconButton color="inherit" component="a" onClick={() => navigate('/about')}>
                                        <ReadMoreIcon />
                                        <Typography sx={{ color: 'black', textDecoration: "none", mx: 1 }} textAlign="center" variant="body1" noWrap>
                                            About
                                        </Typography>
                                    </IconButton>
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
                            <IconButton color="inherit" component="a" onClick={() => navigate('/')}>
                                <DynamicFeedIcon />
                                <Typography sx={{ color: 'white', textDecoration: "none", mx: 1 }} textAlign="center" variant="body1" noWrap>
                                    Feed
                                </Typography>
                            </IconButton>
                            <IconButton color="inherit" component="a" onClick={() => navigate('/userblog')} >
                                <BookIcon />
                                <Typography sx={{ color: 'white', textDecoration: "none", mx: 1 }} textAlign="center" variant="body1" noWrap>
                                    My Blog
                                </Typography>
                            </IconButton>
                            <IconButton color="inherit" component="a" onClick={() => navigate('/about')}>
                                <ReadMoreIcon />
                                <Typography sx={{ color: 'white', textDecoration: "none", mx: 1 }} textAlign="center" variant="body1" noWrap>
                                    About
                                </Typography>
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Profile">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.name} src={user.profileImage} />
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
                                <MenuItem >
                                    <Typography textAlign="center" >{user.name}</Typography>
                                </MenuItem>
                                <MenuItem >
                                    <Typography textAlign="center" onClick={() => { navigate('/userProfile') }}>View Profile</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={logout}>
                                    <Typography textAlign="center" >logout <Logout /></Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        ))
}
export default Navbar;