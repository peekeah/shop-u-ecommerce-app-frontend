import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
function Home() {
  const URL = process.env.REACT_APP_API;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`${URL}/products`);
    setProducts(response.data);
  };
  return (
    <Container>
      <Box mt={5} mb={5}>
        <Grid container spacing={5}>
          {products.map((product) => (
            <Grid item xs={3} key={product._id} >
              <Card product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
