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
import EditUserEventDialog from '../Components/EditUserEventDialog';
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
    const [editOpen, setEditOpen] = React.useState(false);
    const [userEvents, setUserEvents] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState();

    const handleCreateClickOpen = () => {
        setOpen(true);
    };

    const handleCreateClose = () => {
        setOpen(false);
    };

    const handleEditClickOpen = (userEvent) => {
        setSelectedItem(userEvent);
        setEditOpen(true);
    }

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const loadAllUserEvents = async () => {
        const response = await fetch('/api/userevents').catch(setUserEvents(data));
        const userEvents = await response.json();
        setUserEvents(userEvents);
    };

    const handleDelete = async (userEvent) => {
        const response = await fetch(`api/userevents/?userid=${userEvent.UserId}&eventid=${userEvent.EventId}`, { 
            method: 'DELETE' 
        });
        if (response.status === 204) {
            alert('Successfully deleted the selected user event!')
            loadAllUserEvents();
        } else {
            console.error(`Failed to delete the user event: ${userEvent}}, status code = ${response.status}`);
        }
    };

    React.useEffect(() => {
        loadAllUserEvents();
    }, []);

    return(
        <>
            <h2>User Events</h2>
            <p>
                This page displays the intersection table used to manage the M:N relationship between users and events.
                This allows users to mark themselves as going to an event and receive updates, etc.
                Use the button below to add a new category to an event.
            </p>
            <Button sx={{ marginBottom: "5px" }} variant="outlined" onClick={handleCreateClickOpen}>
                Add a new user event
            </Button>
            <CreateUserEventDialog open={open} onClose={handleCreateClose} />
            <EditUserEventDialog open={editOpen} onClose={handleEditClose} userEvent={selectedItem} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="UserEvents Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Event ID</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userEvents.map((row) => (
                            <TableRow
                                key={[row.EventId, row.UserId]}
                            >
                                <TableCell>{row.UserId}</TableCell>
                                <TableCell>{row.EventId}</TableCell>
                                <TableCell><Button onClick={() => handleEditClickOpen(row)} startIcon={<Edit />}></Button></TableCell>
                                <TableCell><Button onClick={() => handleDelete(row)} startIcon={<Delete color='error' />}></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default UserEventsPage;