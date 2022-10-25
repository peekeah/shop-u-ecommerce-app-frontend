import React, { useContext } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MenuList({  anchorEl, setAnchorEl, auth, toggleAuth }) {
// const auth = useContext()
const navigate = useNavigate();

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={true}
      onClose={() => setAnchorEl(null)}
      onClick={() => setAnchorEl(null)}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={() => navigate("/profile")}>My account</MenuItem>
      <MenuItem onClick={() => navigate('/orders')} >Orders</MenuItem>
      <MenuItem onClick={() => toggleAuth(!auth)} >Logout</MenuItem>
    </Menu>
  );
}

export default MenuList;
