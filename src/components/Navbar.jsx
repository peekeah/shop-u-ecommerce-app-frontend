import React, { useState, useContext } from "react";
import { AppBar, Avatar, Box, Button, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import authContext from "../contexts/AuthContext";
import Menu from "./Menu";

function Navbar() {
  const navigate = useNavigate();
  const { auth, toggleAuth } = useContext(authContext);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Box >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} style={{ maxWidth: "1340px", margin: "auto" }} >
            <Box>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Shop Ü
              </Link>
            </Box>
            <Box>
              <Button color="inherit" onClick={() => navigate("/cart")}>
                Cart
              </Button>
              {/* <Button color="inherit" onClick={() => navigate("/orders")}>
                Orders
              </Button> */}
              {!auth ? (
                <Button color="inherit" onClick={() => setOpen(true)}>
                  Login
                </Button>
              ) : (
                <Button color="inherit">
                  <Avatar alt="Remy Sharp" onClick={handleClick} src="" />
                  {openMenu ? (
                    <Menu
                      setAnchorEl={setAnchorEl}
                      anchorEl={anchorEl}
                      auth={auth}
                      toggleAuth={toggleAuth}
                    />
                  ) : null}
                </Button>
              )}
            </Box>
            {open ? <LoginModal setOpen={setOpen} /> : null}
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}

export default Navbar;
