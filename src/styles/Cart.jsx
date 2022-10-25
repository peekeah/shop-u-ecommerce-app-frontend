import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Colors } from "./theme";

export const StyledBox = styled(Box) ({
  borderRadius: '8px',
  backgroundColor: Colors.secondary,
  height: "20vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})
