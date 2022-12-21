import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

function SelectAddress({ setToggleForm }) {
    const URL = process.env.REACT_APP_API;
    const {
        getUser,
        addresses,
        handleLogout,
        config,
        selectedAddressId,
        setSelectedAddressId,
    } = useContext(UserContext);

    useEffect(() => {
        // if addresses are empty then redirecting to add address
        if (addresses.length < 1) {
            setToggleForm(true);
        }
    }, []);

    // function to delete address
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/users/delete-address/${id}`, config);
            getUser();
        } catch (err) {
            handleLogout();
            console.log(err);
        }
    };

    return (
        <Stack spacing={2} mx={5} my={3}>
        {
            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Address</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={selectedAddressId}
                name="radio-buttons-group"
                onChange={(e) => setSelectedAddressId(e.target.value)}
            >
                <Table>
                <TableBody>
                    {addresses.map((s) => (
                    <TableRow
                        key={s._id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                        <TableCell>
                        <FormControlLabel
                            value={s._id}
                            control={<Radio />}
                            label={`${s.name}, ${s.address},   ${s.pincode}`}
                        />
                        </TableCell>
                        <TableCell>
                        <IconButton onClick={() => handleDelete(s._id)}>
                            <Delete />{" "}
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </RadioGroup>
            </FormControl>
        }

        <Box
            sx={{ display: "flex", justifyContent: "center", pb: 2 }}
            onClick={() => setToggleForm(true)}
        >
            <Button
                variant="contained"
                sx={{ width: 200 }}
                onClick={() => setToggleForm(true)}
            >
            Add Address
            </Button>
        </Box>
        </Stack>
    );
}

export default SelectAddress;
