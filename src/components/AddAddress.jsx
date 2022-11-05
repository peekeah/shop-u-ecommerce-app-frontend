import React, { useContext } from 'react'
import UserContext from "../contexts/UserContext";
import {
    Box,
    Button,
    Stack,
    TextField,
} from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import * as yup from "yup";

function AddAddress({ setToggleForm }) {
    const URL = process.env.REACT_APP_API;
    const { config, getUser, handleLogout } = useContext(UserContext);

    const initialValues = {
        name: "",
        address: "",
        pincode: "",
    };

    // yup validation schema
    const schema = yup.object().shape({
        name: yup.string().required("Name is Required").min(3, 'Name is too short'),
        address: yup.string().required("Password is required").min(6, 'Address is too short'),
        pincode: yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, 'Must be exactly 6 digits')
        .max(6, 'Must be exactly 6 digits')
    });

    // function to add address to db
    const handleSubmit = async(values) => {
        try {
            await axios.patch(`${URL}/users/add-address`, values, config);
            setToggleForm(false);
            getUser();
        } catch (err) {
            console.log(err);
            handleLogout();
        }
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
                    <Stack spacing={2} sx={{ p: 4 }}>
                    <TextField
                        label="Name"
                        variant="standard"
                        fullWidth={false}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                    />
                    <TextField
                        label="Address"
                        placeholder="Placeholder"
                        multiline
                        variant="standard"
                        fullWidth={false}
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                    />
                    <TextField
                        label="Pincode"
                        variant="standard"
                        fullWidth={false}
                        name="pincode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.pincode && errors.pincode)}
                        helperText={touched.pincode && errors.pincode}
                    />
                    <Box>
                        <Button variant="contained" onClick={handleSubmit}>
                        Add
                        </Button>
                    </Box>
            </Stack>
        </Form>
        )}
        </Formik>
    )
}

export default AddAddress