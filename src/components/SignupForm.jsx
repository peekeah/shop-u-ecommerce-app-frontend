import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

const SignupForm = () => {
    const URL = process.env.REACT_APP_API;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async(e) => { 
        e.preventDefault();
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={3}>
            <TextField
                label="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <TextField
                label="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                label="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <Button color="primary" variant="contained" type="submit">
            Sign Up
            </Button>
        </Stack>
        </form>
    );
};

export default SignupForm;
