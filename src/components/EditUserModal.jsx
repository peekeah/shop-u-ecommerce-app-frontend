import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

function EditUserModal({ setOpen, data, counter, setCounter }) {
  const URL = process.env.REACT_APP_API;
  const { config } = useContext(AuthContext);
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const initialValues = { ...data };

  const schema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    mobile_no: yup.number(),
    //#FIXME:   Validation shema for mobile validation
    // .test('len', 'Must be exactly 10 characters', (val="") => val.length === 10)
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.patch(
        `${URL}/users/update/${data._id}`,
        values,
        config
      );
      setCounter(counter + 1);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={true}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
                <Typography align="center" variant="h4">
                  Edit
                </Typography>
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
                  label="Contact"
                  name="mobile_no"
                  value={values.mobile_no}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.mobile_no && errors.mobile_no)}
                  helperText={touched.mobile_no && errors.mobile_no}
                />

                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={
                    !isValid ||
                    JSON.stringify(initialValues) === JSON.stringify(values)
                  }
                >
                  Save
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default EditUserModal;
