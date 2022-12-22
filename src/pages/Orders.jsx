import axios from "axios";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function Orders() {
  const URL = process.env.REACT_APP_API;
  const [orders, setOrders] = useState([]);

  const { config } = useContext(UserContext);

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get(`${URL}/orders/user-orders`, config);
      setOrders(response.data);
    };
    getOrders();
  }, []);

  return (
    <Container >
      <Typography variant="h3" sx={{ pt: 2, pb: 5, textAlign: "center" }}>Orders</Typography>
      <Box>
      {orders.map((s) => (
        <Paper key={s._id} sx={{ mb: 3, borderRadius: 2, overflow: "hidden" }}>
          <Stack direction="row" spacing={3} p={2}  style={{ backgroundColor: '#d3d3d3'}} >
            <Typography>Order Id: {s.order_id}</Typography>
            <Typography>Total: ₹{s.order_total}</Typography>
            <Typography>Ship To: {s.customer_name}</Typography>
          </Stack>
          <Box p={2}>
          {
            s.products.map(product => (
              <Box>
              {/* <img src={product}/> */}
                  {product.product_name}
              </Box>
            ))
          }
          </Box>
        </Paper>
      ))}
      </Box>
    </Container>
  );
}

export default Orders;
