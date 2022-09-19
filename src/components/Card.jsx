import {
  Box,
  Button,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProductModal from "../components/ProductModal";

function Card({ product }) {
    const [open, setOpen] = useState(false);

    

    return (
        <>
        <Paper elevation={3} sx={{ p: 3 }}>
            <Stack spacing={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                style={{ height: "12rem", maxWidth: "12rem" }}
                src={product.image}
                />
            </Box>
            {/* <Typography variant="body1">{product.product_name}</Typography> */}
            <Box>
                <Rating name="read-only" value={product.rating.rate} readOnly />
                <Box>
                <Button>Add to cart</Button>
                <Button onClick={() => setOpen(true)} >View</Button>
                </Box>
            </Box>
            </Stack>
        </Paper>
        {open? <ProductModal setOpen={setOpen} product={product}/>: null}
        </>
    );
}

export default Card;
