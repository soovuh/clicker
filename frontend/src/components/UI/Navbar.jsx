import { useState, useEffect } from 'react';
import { getUser, getUserExtended } from '../../functions/httpRequests';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import RouterLink from './RouterLink';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthorized, accessToken, removeTokens } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState({ username: null, image: null });
  const { username, image } = user;
  const pages = isAuthorized
    ? ['Home', 'Leaders', 'Profile']
    : ['Home', 'Leaders'];
  const settings = ['Profile', 'Logout'];

  useEffect(() => {
    if (!accessToken) {
      setAnchorElNav(null);
      setAnchorElUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await getUser(accessToken);
        const data = await response.json();
        const { id } = data;

        if (!response.ok) {
          return;
        }

        const extendedResponse = await getUserExtended(id);
        const extendedData = await extendedResponse.json();
        setUser(extendedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [accessToken]);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container sx={{ minWidth: { xs: '100%' }, width: '100%' }}>
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: '50px' }, height: '50px' }}
        >
          <RouterLink
            to="/"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AdsClickIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Clicker
            </Typography>
          </RouterLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              keepMounted
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' }, mt: '2px' }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <RouterLink
                    to={`/${page === 'Home' ? '' : page.toLocaleLowerCase()}`}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {page}
                    </Typography>
                  </RouterLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <RouterLink
            to="/"
            sx={{
              display: window.innerWidth < 900 ? 'flex' : 'none',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: '1',
            }}
          >
            <AdsClickIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Clicker
            </Typography>
          </RouterLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <RouterLink
                to={`/${page === 'Home' ? '' : page.toLocaleLowerCase()}`}
                key={page}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    textTransform: 'none',
                  }}
                >
                  <Typography variant="h6">{page}</Typography>
                </Button>
              </RouterLink>
            ))}
          </Box>

          {isAuthorized ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={username} src={image} />
                </IconButton>
              </Tooltip>
              <Menu
                keepMounted
                id="menu-appbar"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{ mt: '35px' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {settings.map(setting =>
                  setting.toLocaleLowerCase() === 'logout' ? (
                    <MenuItem key={setting} onClick={removeTokens}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ) : (
                    <RouterLink
                      to={`/${setting.toLocaleLowerCase()}`}
                      key={setting}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </RouterLink>
                  )
                )}
              </Menu>
            </Box>
          ) : (
            <RouterLink to={'/login'}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'none',
                }}
              >
                <Typography variant="h6">Login</Typography>
              </Button>
            </RouterLink>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
