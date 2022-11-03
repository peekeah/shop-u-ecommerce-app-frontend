import {
  Modal,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

const LoginModal = ({ setOpen }) => {
  const [toggleLogin, setToggleLogin] = useState(true);

  return (
    <Modal
      open={true}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {toggleLogin ? (
          <LoginForm setOpen={setOpen} setToggleLogin={setToggleLogin} />
        ) : (
          <SignupForm setOpen={setOpen} setToggleLogin={setToggleLogin} />
        )}
      </Box>
    </Modal>
  );
};

export default LoginModal;
