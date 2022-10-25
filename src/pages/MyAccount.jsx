import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import EditUserModal from "../components/EditUserModal";
import AuthContext from "../contexts/AuthContext";

function MyAccount() {
  const URL = process.env.REACT_APP_API;
  const { config } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  const getUser = async () => {
    try {
      const res = await axios.get(`${URL}/users/get-user`, config);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, [counter]);

  return (

      <Container maxWidth="sm">
        <Box style={{ marginTop: "17%" }}>
          <Typography align="center" variant="h3" sx={{ m: 3 }}>
            Profile
          </Typography>
          <TableContainer
            component={Paper}
          >
            <Table aria-label="simple table">
              {data && (
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.name}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Email
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.email}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Mobile
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.mobile_no}
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Edit
            </Button>
          </Box>
        </Box>
        {open && (
          <EditUserModal
            data={data}
            setOpen={setOpen}
            counter={counter}
            setCounter={setCounter}
          />
        )}
      </Container>
  );
}

export default MyAccount;
