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
import CartContext from "../contexts/CartContext";
import displayRazorpay from "../utils/Razorpay";

const Checkout = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, orderTotal } = useContext(CartContext);

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
      <Box my={3}>Order Total is {orderTotal()}</Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button variant="contained" color="primary" onClick={displayRazorpay}>
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
