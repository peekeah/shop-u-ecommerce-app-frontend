import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material'
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext';

function SelectAddress({ setToggleForm }) {
    
    const { getUser, userData } = useContext(UserContext);

    useEffect(() => {
        try {
            getUser();
        } catch (err) {
        }
    }, [])

    return (
        <Stack spacing={2} mx={5} my={3}>
                {
                    userData.addresses &&
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Address</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={userData.addresses[0]._id}
                                name="radio-buttons-group"
                            >
                            {
                                userData.addresses.map((s, id) => (
                                <FormControlLabel key={id} value={s._id} control={<Radio />} label={`${s.name}, ${s.address},   ${s.pincode}`} />
                            ))       
                            }
                            </RadioGroup>
                        </FormControl>
                }

                <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }} onClick={() => setToggleForm (true)} >
                    <Button variant="contained" sx={{width: 200 }}>Add Address</Button>
                </Box>
        </Stack>
    )
}

export default SelectAddress