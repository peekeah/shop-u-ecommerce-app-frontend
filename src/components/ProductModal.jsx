import { Box, Modal, Typography } from "@mui/material";
import React from "react";

function Model({ setOpen, product }) {
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  console.log(product)
  return (
    <Modal
      open={true}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {product.product_name}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {product.description}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {product.price}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {product.category}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {product.rating.rate}
        </Typography>
      </Box>
    </Modal>
  );
}

export default Model;
