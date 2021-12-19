import React from 'react';
import { Typography, List, ListItem, TextField, Button } from '@material-ui/core';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizzard from '../components/CheckoutWizzard';

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = React.useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  React.useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }

    ['fullName', 'address', 'city', 'postalCode', 'country'].forEach((el) => setValue(el, shippingAddress[el]));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: { fullName, address, city, postalCode, country } });
    Cookies.set('shippingAddress', JSON.stringify({ fullName, address, city, postalCode, country }));
    router.push('/payment');
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizzard activeStep={1} />
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <Typography variant="h1" component="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName ? (errors.fullName.type === 'minLength' ? 'Full Name is to short' : 'Full Name is required') : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={errors.address ? (errors.address.type === 'minLength' ? 'Address is to short' : 'Address is required') : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  error={Boolean(errors.city)}
                  helperText={errors.city ? (errors.city.type === 'minLength' ? 'City is to short' : 'City is required') : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  error={Boolean(errors.postalCode)}
                  helperText={errors.postalCode ? (errors.postalCode.type === 'minLength' ? 'Postal Code is to short' : 'Postal Code is required') : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  error={Boolean(errors.country)}
                  helperText={errors.country ? (errors.country.type === 'minLength' ? 'Country is to short' : 'Country is required') : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
