import React from 'react';
import { Typography, List, ListItem, TextField, Button, Link } from '@material-ui/core';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Register() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = React.useContext(Store);
  const { userInfo } = state;
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  React.useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords don`t match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };

  return (
    <Layout title="Register">
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography variant="h1" component="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <TextField variant="outlined" fullWidth id="name" label="Name" inputProps={{ type: 'name' }} onChange={(e) => setName(e.target.value)}></TextField>
          </ListItem>
          <ListItem>
            <TextField variant="outlined" fullWidth id="email" label="Email" inputProps={{ type: 'email' }} onChange={(e) => setEmail(e.target.value)}></TextField>
          </ListItem>
          <ListItem>
            <TextField variant="outlined" fullWidth id="password" label="Password" inputProps={{ type: 'password' }} onChange={(e) => setPassword(e.target.value)}></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm password"
              inputProps={{ type: 'confirmPassword' }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account?&nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
