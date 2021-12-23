import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { AppBar, Container, createTheme, CssBaseline, Link, Switch, ThemeProvider, Toolbar, Typography, Badge, Button, Menu, MenuItem } from '@material-ui/core';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout({ children, title, description }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState();
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({
      type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON',
    });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect !== 'backdropClick') {
      router.push(redirect);
    }
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    router.push('/');
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippinhAddress');
    Cookies.remove('paymentMethod');
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : `Next Amazona`}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider {...{ theme }}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge color="secondary" badgeContent={cart.cartItems.length}>
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button id="basic-button" aria-controls="basic-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={loginClickHandler} className={classes.navbarButton}>
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>Profile</MenuItem>

                    <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/order-history')}>Order History</MenuItem>
                    {userInfo.isAdmin && <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/admin/dashboard')}>Admin Dashboard</MenuItem>}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Next Amazona.</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
