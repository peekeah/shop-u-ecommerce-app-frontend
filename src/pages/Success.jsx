import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/orders");
    }, 3000);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.7rem",
        margin: "10%",
      }}
    >
      <CheckCircleIcon
        color="success"
        style={{ height: "5rem", width: "5rem" }}
      />
      <Typography variant="h4">Thank you so much for purchase</Typography>
    </Box>
  );
}

export default SuccessPage;
