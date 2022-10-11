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
import { Delete } from "@mui/icons-material";
import React, { useContext } from "react";
import CartContext from "../contexts/CartContext";
import { StyledBox } from "../styles/Cart";
import { AddQty } from "../components/AddQty";

function Cart() {
  const { cartItems, removeFromCart, orderTotal } = useContext(CartContext);
  console.log(orderTotal());
  // console.log(cartItems)
  return (
    <Box style={{ margin: "2rem auto", width: "65%" }}>
      <Stack direction="row" spacing={1}>
        <Box flexGrow={2}>
          {cartItems.length < 1 ? (
            <StyledBox>
              <Typography color="white"> Your Cart is Empty</Typography>
            </StyledBox>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {cartItems.map((s, id) => (
                    <TableRow style={{ height: "10rem" }} key={id}>
                      <TableCell>{s.product_name}</TableCell>
                      <TableCell>
                        <img src={s.image} style={{ width: "60px" }} />
                      </TableCell>
                      <TableCell>{s.category}</TableCell>
                      <TableCell>{s.price} $</TableCell>
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
          )}
        </Box>
        <Box flexGrow={1}>
          <Card variant="outlined" style={{ margin: "auto", maxWidth: "90%" }}>
            <Stack direction="column" m={2} spacing={1}>
              <Typography variant="h5">
                Subtotal {cartItems.length} Items
              </Typography>
              <Typography variant="h6">$ {orderTotal()}</Typography>
            </Stack>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" color="secondary" sx={{ m: 2 }}>
                Proceed to checkout
              </Button>
            </Box>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
}

export default Cart;
