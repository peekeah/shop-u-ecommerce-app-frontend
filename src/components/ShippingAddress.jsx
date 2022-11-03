import React, { useState } from "react";
import {
    Box,
    Divider,
    Paper,
    Typography,
} from "@mui/material";

import AddAddress from "./AddAddress";
import SelectAddress from "./SelectAddress";

function ShippingAddress() {
    const [toggleForm, setToggleForm] = useState(false);

    return (
        <Paper sx={{ mt: 5}}>
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
