import axios from "axios";
import { Box, Container, Paper, Stack, Tooltip, Typography } from "@mui/material";
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
    <Container>
      <Typography variant="h3" sx={{ pt: 2, pb: 5, textAlign: "center" }}>
        Orders
      </Typography>
      <Box>
        {orders.map((s) => (
          <Paper
            key={s._id}
            sx={{ mb: 3, borderRadius: 2, overflow: "hidden" }}
          >
            <Stack
              direction="row"
              spacing={3}
              p={2}
              style={{ backgroundColor: "#d3d3d3" }}
            >
              <Typography>Order Id: {s.order_id}</Typography>
              <Typography>Total: ₹{s.order_total}</Typography>
            
              <Tooltip title={s.shipping_address.address+", "+s.shipping_address.pincode} arrow={true}>
                {/* <IconButton>
                  <DeleteIcon />
                </IconButton> */}
              <Typography>Ship To: {s.shipping_address.name}</Typography>
              </Tooltip>
            </Stack>
            <Stack p={2} spacing={1}>
              {s.products.map((product) => (
                <Stack direction="row" spacing={5} key={product._id}>
                  <Box>{product.product_name}</Box>
                  <Box>{product.quantity}</Box>
                  <Box>₹{product.price}</Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default Orders;
