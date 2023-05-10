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

const data = [
    { UserId: 1, Name: 'Abbie Cooper', Email: 'abbie.cooper@example.com' },
    { UserId: 2, Name: 'Hans Dressler', Email: 'hans.dressler@example.com' },
    { UserId: 3, Name: 'Lila Blanchard', Email: 'lila.blanchard@example.com' },
    { UserId: 4, Name: 'Christina Campbell', Email: 'christina.campbell@example.com' },
    { UserId: 5, Name: 'Guerete Fernandes', Email: 'guerete.fernandez@example.com' }
]

function UsersPage(){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <CreateUserDialog open={open} handleClose={handleClose} />
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
                        {data.map((row) => (
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