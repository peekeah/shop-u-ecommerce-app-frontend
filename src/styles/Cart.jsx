import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Colors } from "./theme";

export const StyledBox = styled(Box) ({
  borderRadius: '8px',
  backgroundColor: Colors.primary,
  height: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})
