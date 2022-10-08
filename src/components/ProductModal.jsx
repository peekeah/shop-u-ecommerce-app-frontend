import { Box, Divider, Modal, Rating, Stack, Typography } from "@mui/material";
import React from "react";

function Model({ setOpen, product }) {
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  console.log(product);
  return (
    <Modal
      open={true}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" component="h2">
          {product.product_name}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={2} mt={2}>
          <Typography>{product.description}</Typography>
          <Typography>Price: {product.price}</Typography>
          <Typography>Category: {product.category}</Typography>
          <Rating name="read-only" value={product.rating.rate} readOnly />
        </Stack>
      </Box>
    </Modal>
  );
}

export default Model;
