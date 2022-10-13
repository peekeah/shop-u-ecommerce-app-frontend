import React, { useState, useContext } from "react";
import ProductModal from "../components/ProductModal";
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddShoppingCart,
  RemoveShoppingCart,
  Description,
} from "@mui/icons-material";
import ProductsContext from "../contexts/ProductsContext";

function Card({ product }) {
  const [open, setOpen] = useState(false);
  const { addToCart, removeFromCart } = useContext(ProductsContext);

  return (
    <>
      <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ height: "12rem", maxWidth: "12rem" }}
              src={product.image}
              alt={product.product_name}
            />
          </Box>
          <Typography
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {product.product_name}
          </Typography>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                {product.isProductInCart === false ? (
                  <Tooltip title="Add to cart" arrow>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => addToCart(product)}
                    >
                      <AddShoppingCart />
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Remove from cart" arrow>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => removeFromCart(product)}
                    >
                      <RemoveShoppingCart />
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title="Product Description" arrow>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => setOpen(true)}
                  >
                    <Description />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </Box>
          </Box>
        </Stack>
      </Paper>
      {open ? <ProductModal setOpen={setOpen} product={product} /> : null}
    </>
  );
}

export default Card;
