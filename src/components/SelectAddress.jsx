import { Button, Stack } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

function SelectAddress({ setToggleForm }) {
    const [addresses, setAddresses] = useState([]);

    const { getUser, userData } = useContext(UserContext);


    useEffect(() => {
        try {
            if(!userData){
                getUser();
            }
            setAddresses(userData.addresses);
        } catch (err) {
            // handle error
        }
    }, [])


    return (
        <Stack spacing={2}>
                {
                    addresses.map((s, id) => (
                        <Box key={id}>{`${s.name}, ${s.address}, ${s.pincode}`}</Box>
                    ))       
                }
                <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }} onClick={() => setToggleForm (true)} >
                    
                <Button variant="contained" sx={{width: 200 }}>Add Address</Button>
                </Box>
        </Stack>
    )
}

export default SelectAddress