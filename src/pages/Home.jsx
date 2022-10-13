import React from "react";
import Card from "../components/Card";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import ProductsContext from "../contexts/ProductsContext";

function Home() {
  const { products } = useContext(ProductsContext);

  console.log(products)
  return (
    <Container>
      <Box mt={5} mb={5}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={3} key={product._id}>
              <Card product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
