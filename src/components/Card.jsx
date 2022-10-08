import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { AddShoppingCart, Description } from "@mui/icons-material";
import React, { useState } from "react";
import ProductModal from "../components/ProductModal";

function Card({ product }) {
  const [open, setOpen] = useState(false);

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
                <Button color="secondary" variant="contained">
                  <AddShoppingCart />
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  <Description />
                </Button>
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
