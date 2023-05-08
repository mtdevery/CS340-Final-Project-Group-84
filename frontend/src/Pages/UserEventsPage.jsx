import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CreateUserEventDialog from '../Components/CreateUserEventDialog';
import { Edit, Delete } from '@mui/icons-material/';

const data = [
    { UserId: 1, EventId: 1},
    { UserId: 1, EventId: 5},
    { UserId: 3, EventId: 1},
    { UserId: 4, EventId: 3},
    { UserId: 2, EventId: 3}
];

function UserEventsPage(){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleDelete(event){

    };

    return(
        <>
            <h2>User Events</h2>

            <Button sx={{ marginBottom: "5px" }} variant="outlined" onClick={handleClickOpen}>
                Add a new user event
            </Button>
            <CreateUserEventDialog open={open} handleClose={handleClose} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Categories Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Event ID</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.EventId}
                            >
                                <TableCell>{row.UserId}</TableCell>
                                <TableCell>{row.EventId}</TableCell>
                                <TableCell><Button onClick={handleClickOpen} startIcon={<Edit />}></Button></TableCell>
                                <TableCell><Button onClick={handleDelete(row)} startIcon={<Delete color='error' />}></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default UserEventsPage;