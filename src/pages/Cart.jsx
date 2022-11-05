import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import { StyledBox } from "../styles/Cart";
import { AddQty } from "../components/AddQty";
import  ShippingAddress from "../components/ShippingAddress";
import { useNavigate } from "react-router-dom";
import ProductsContext from "../contexts/ProductsContext";
import UserContext from "../contexts/UserContext";

function Cart() {
  const { cartItems, removeFromCart, orderTotal } = useContext(ProductsContext);
  const { userData, getUser } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px auto",
        }}
      >
        <IconButton onClick={() => navigate("/")}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Continue Shopping</Typography>
      </Box>
      <Box style={{ margin: "2rem auto", width: "65%" }}>
        <Box>
          {cartItems.length < 1 ? (
            <StyledBox>
              <Typography variant="h4" color="primary">
                Your Cart is Empty
              </Typography>
            </StyledBox>
          ) : (
            <>
              <Stack direction="row" spacing={1}>
                <Box flex={3}>
                  <TableContainer component={Paper}>
                    <Box my={2}>
                      <Typography align="center" variant="h4">
                        Cart Items
                      </Typography>
                    </Box>
                    <Divider />
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody>
                        {cartItems.map((s, id) => (
                          <TableRow style={{ height: "10rem" }} key={id}>
                            <TableCell>{s.product_name}</TableCell>
                            <TableCell>
                              <img src={s.image} style={{ width: "60px" }} />
                            </TableCell>
                            <TableCell>{s.category}</TableCell>
                            <TableCell>₹ {s.price}</TableCell>
                            <TableCell>
                              <AddQty productId={s._id} />
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={() => removeFromCart(s)}>
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box flex={1}>
                  <Card
                    variant="outlined"
                    style={{ margin: "auto", maxWidth: "90%" }}
                  >
                    <Box my={2}>
                      <Typography align="center" variant="h4">
                        Payment
                      </Typography>
                    </Box>
                    <Divider />
                    <Stack direction="column" m={2} spacing={1}>
                      <Typography variant="h5">
                        Subtotal {cartItems.length} Items
                      </Typography>
                      <Typography variant="h6">₹ {orderTotal()}</Typography>
                    </Stack>
                    <Divider />
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ m: 2 }}
                        onClick={() => navigate("/checkout", { state: 5 })}
                        disabled={userData.addresses?.length < 1}
                      >
                        Proceed to checkout
                      </Button>
                    </Box>
                  </Card>
                </Box>
              </Stack>
              <ShippingAddress />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Cart;
