import React, { useState, useContext } from "react";
import axios from "axios";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import UserContext from "../contexts/UserContext";

const LoginForm = ({ setOpen, setToggleLogin }) => {
  const URL = process.env.REACT_APP_API;
  const [err, setErr] = useState(null);

  const { handleLogin, handleLogout } = useContext(UserContext);

  const initialValues = {
    email: "",
    password: "",
  };


  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {

    try {
      const response = await axios.post(`${URL}/register/signin`, values);
      handleLogin(response.data);
      setOpen(false);

    } catch (err) {
      console.log(err);
      handleLogout();
      setErr(true)
    }

  };
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit} >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <Form>
          <Stack spacing={2}>
          <Typography align="center" variant="h4">Login</Typography>
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean( touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean( touched.password && errors.password)}
              helperText={
                touched.password && errors.password
              }
            />
            
            {/* //FIXME:Alert need to be add */}
            {/* {
              err && 
            <Alert severity="error">{err}</Alert> 
            } */}
            <Typography component='div'>New User? <Typography component='span' onClick={() =>setToggleLogin(false)  } sx={{textDecoration: 'underline', cursor: 'pointer'}}>Register</Typography></Typography>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={
                JSON.stringify(initialValues) === JSON.stringify(values) ||
                !isValid
              }
            >
              Log In
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
