import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";

const SignupForm = ({ handleOpen, setToggleLogin }) => {
  const URL = process.env.REACT_APP_API;

  const initialValues = {
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
  };

  const schema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Password is required"),
    cnfPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords didn't match")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
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
          <Stack direction="column" spacing={2}>
          <Typography align="center" variant="h4">Signup</Typography>
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              label="Confirm Password"
              name="cnfPassword"
              type="password"
              value={values.cnfPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.cnfPassword && errors.cnfPassword)}
              helperText={touched.cnfPassword && errors.cnfPassword}
            />
            <Typography component='div'>Alredy a User? <Typography component='span' onClick={() =>setToggleLogin(true)  } sx={{textDecoration: 'underline', cursor: 'pointer'}}>Login</Typography></Typography>

            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={
                !isValid ||
                JSON.stringify(initialValues) === JSON.stringify(values)
              }
            >
              Sign Up
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
