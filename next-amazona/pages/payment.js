import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import CheckoutWizzard from '../components/CheckoutWizzard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';

export default function Payment() {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const { state, dispatch } = React.useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  const router = useRouter();

  React.useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment Method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };

  return (
    <Layout title="Payment Method">
      <CheckoutWizzard activeStep={2}></CheckoutWizzard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography variant="h1" component="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup aria-label="Payment Method" name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel label="PayPal" value="PayPal" control={<Radio />}></FormControlLabel>
                <FormControlLabel label="Stripe" value="Stripe" control={<Radio />}></FormControlLabel>
                <FormControlLabel label="Cash" value="Cash" control={<Radio />}></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button fullWidth type="button" variant="contained" onClick={() => router.push('/shipping')}>
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
