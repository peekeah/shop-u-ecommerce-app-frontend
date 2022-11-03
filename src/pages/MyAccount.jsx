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
import React, { useContext, useEffect, useState } from "react";
import EditUserModal from "../components/EditUserModal";
import UserContext from "../contexts/UserContext";

function MyAccount() {

  const [open, setOpen] = useState(false);

  const { userData, getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

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
              {userData && (
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {userData.name}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Email
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {userData.email}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Mobile
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {userData.mobile_no}
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
            data={userData}
            setOpen={setOpen}
            getUser={getUser}
          />
        )}
      </Container>
  );
}

export default MyAccount;
