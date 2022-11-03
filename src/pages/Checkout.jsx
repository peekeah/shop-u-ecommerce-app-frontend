import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsContext from "../contexts/ProductsContext";
import axios from "axios";
import UserContext from "../contexts/UserContext";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
};


const displayRazorpay = async (config, orderTotal, navigate) => {
  const URL = process.env.REACT_APP_API;
  // const navigate = useNavigate();
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load");
  }
  
  const razorpayKey = await process.env.REACT_APP_RAZORPAY_KEY;
  const data = await axios.post(`${URL}/razorpay/pay`, {
    total: orderTotal()
  }, config).then((s) => s.data);

  const options = {
    key: razorpayKey,
    amount: data.total,
    currency: data.currency,
    name: "Shop U Inc",
    description: "Thank you for shopping at Shop U",
    image: "/favicon.ico",
    order_id: data.order_id,
    handler: function(response) {
      if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
        navigate('/');
      } else {
        navigate('/success');
      }
    },
    prefill: {
      name: data.name,
      email: data.email,
      contact: data.mobile_no,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};


const Checkout = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, orderTotal  } = useContext(ProductsContext);
  const { config } = useContext(UserContext);


  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, []);

  

  return (
    <Box style={{ maxWidth: "90rem", margin: "auto" }}>
      <Typography align="center" variant="h4" m={3}>
        Order Summary
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {cartItems.map((s, id) => (
              <TableRow style={{ height: "10rem" }} key={id}>
                <TableCell>{s.product_name}</TableCell>
                <TableCell>
                  <img src={s.image} style={{ width: "60px" }} />
                </TableCell>
                <TableCell>{s.category}</TableCell>
                <TableCell>₹ {s.price}</TableCell>
                <TableCell>{s.qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={3} sx={{display: "flex", justifyContent: "center"}} ><Typography variant="h4">Order Total is {orderTotal()}</Typography></Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button variant="contained" color="primary" onClick={() => displayRazorpay(config, orderTotal, navigate)}>
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
