import React, { useState } from "react";
import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";

const LoginForm = ({ setOpen }) => {
    const URL = process.env.REACT_APP_API;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handlSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${URL}/register/signin`, formData);
            console.log(response.data);
            localStorage.setItem("token", response.data);
        } catch (err) {
            console.log(err);
        }

        setOpen(false);
    };
    return (
        <form onSubmit={handlSubmit}>
        <Stack spacing={2}>
            <TextField
                label="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
            />
            <TextField
                label="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <Button variant="contained" color="success" type="submit">
            Log In
            </Button>
        </Stack>
        </form>
    );
};

export default LoginForm;
