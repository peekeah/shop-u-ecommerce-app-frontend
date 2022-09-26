import React, { useState, useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import authContext from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { auth, toggleAuth } = useContext(authContext);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-commerce app
          </Typography>
          <Button color="inherit" onClick={() => navigate("/cart")}>
            Cart
          </Button>
          <Button color="inherit" onClick={() => navigate("/orders")}>
            Orders
          </Button>
          {!auth ? (
            <Button color="inherit" onClick={() => setOpen(true)}>
              Login
            </Button>
          ) : (
            <Button onClick={toggleAuth} color="inherit">Logout</Button>
          )}
          {open ? <LoginModal setOpen={setOpen} /> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
