import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CreateUserDialog from '../Components/CreateUserDialog';

function UsersPage(){
    // Define useState hooks to handle opening dialogs and setting the displayed data
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState([]);

    // Open CREATE Dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close CREATE Dialog and reload data
    const handleClose = () => {
        setOpen(false);
        loadAllUsers();
    };

    // Function to RETRIEVE all users from the server with fetch
    const loadAllUsers = async () => {
        const response = await fetch('/api/users');
        const usersData = await response.json();
        setUsers(usersData);
    };

    // UseEffect hook loads all user events on page load
    React.useEffect(() => {
        loadAllUsers();
    }, []);

    return(
        <>
            <h2>Users</h2>
            <p>
                This page displays the information about the users of our website. This table has a N:M
                relationship with events.
                Use the button below to add a new user.
            </p>
            <Button sx={{ marginBottom: "5px" }} variant="outlined" onClick={handleClickOpen}>
                Add a new user
            </Button>
            <CreateUserDialog open={open} onClose={handleClose} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Users Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.EventId}
                            >
                                <TableCell>{row.UserId}</TableCell>
                                <TableCell>{row.Name}</TableCell>
                                <TableCell>{row.Email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default UsersPage;