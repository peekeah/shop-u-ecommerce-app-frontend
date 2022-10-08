import {
  Modal,
  Box,
  Button,
  Stack,
  TextField,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Inbox } from "@mui/icons-material";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import * as yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoginModal = ({ setOpen }) => {
  const [toggleLogin, setToggleLogin] = useState(true);

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords didn't match"),
  });

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
