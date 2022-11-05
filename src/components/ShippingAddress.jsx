import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Divider,
    Paper,
    Typography,
} from "@mui/material";
import UserContext from '../contexts/UserContext';
import AddAddress from "./AddAddress";
import SelectAddress from "./SelectAddress";

function ShippingAddress() {
    const [toggleForm, setToggleForm] = useState(false);
    const { getUser, addresses } = useContext(UserContext);

    // getting user data on initial render
    useEffect(() => {
        getUser();
    }, [])

    // toggling form on deleting address
    useEffect(() => {
        if(addresses.length > 0) {
            setToggleForm(false);
        } else {
            setToggleForm(true);
        }
    }, [addresses])


    return (
        <Paper sx={{ mt: 5, maxWidth: 1000}}  >
            <Box sx={{ p: 2 }}>
                <Typography align="center" variant="h4">
                Shipping Address
                </Typography>
            </Box>
            <Divider />
            {toggleForm ? (
                <AddAddress setToggleForm={setToggleForm} />
            ) : (
                <SelectAddress setToggleForm={setToggleForm} />
            )}
        </Paper>
    );
}

export default ShippingAddress;
