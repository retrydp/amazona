import NextLink from 'next/link';
import { Card, CardActionArea, CardMedia, Grid, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import Layout from '../components/Layout';
import data from '../utils/data';

export default function Home() {
  return (
    <Layout>
      <div className="">
        <h1>Products</h1>
        <Grid container spacing={3}>
          {data.products.map(({ image, name, price, slug }) => (
            <Grid item md={4} key={name}>
              <Card>
                <NextLink href={`/product/${slug}`} passHref>
                  <CardActionArea>
                    <CardMedia component="img" image={image} title={name}></CardMedia>
                    <CardContent>
                      <Typography>{name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${price}</Typography>
                  <Button size="small" color="primary">
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
