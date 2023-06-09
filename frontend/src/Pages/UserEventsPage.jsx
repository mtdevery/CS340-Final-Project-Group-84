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

function UserEventsPage(){
    // Define useState hooks to handle opening dialogs and setting the displayed data
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [userEvents, setUserEvents] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState();

    // Open CREATE Dialog
    const handleCreateClickOpen = () => {
        setOpen(true);
    };

    // Close CREATE Dialog and reload data
    const handleCreateClose = () => {
        setOpen(false);
        loadAllUserEvents();
    };

    // Open UPDATE Dialog
    const handleEditClickOpen = (userEvent) => {
        setSelectedItem(userEvent);
        setEditOpen(true);
    }

    // Close UPDATE Dialog and reload data
    const handleEditClose = () => {
        setEditOpen(false);
        loadAllUserEvents();
    };

    // Function to RETRIEVE all user events from the server with fetch
    const loadAllUserEvents = async () => {
        const response = await fetch('/api/userevents');
        const userEvents = await response.json();
        setUserEvents(userEvents);
    };

    // Function to DELETE a user event with fetch to the server api
    const handleDelete = async (userEvent) => {
        const response = await fetch(`/api/userevents/${userEvent.UserId}/${userEvent.EventId}`, { 
            method: 'DELETE'
        });
        if (response.status === 204) {
            alert('Successfully deleted the selected user event!')
            loadAllUserEvents();
        } else {
            const errorResponse = await response.json();
            alert(`Category not added. Please check that all required fields are entered. Status code = ${response.status}, message = ${errorResponse.message}`);
        }
    };

    // UseEffect hook loads all user events on page load
    React.useEffect(() => {
        loadAllUserEvents();
    }, []);

    return(
        <>
            <h2>User Events</h2>
            <p>
                This page displays the intersection table used to manage the M:N relationship between users and events.
                This allows users to mark themselves as going to an event and receive updates, etc.
                Use the button below to add a new user to an event.
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
                            <TableCell>User's Name</TableCell>
                            <TableCell>Event ID</TableCell>
                            <TableCell>Event Description</TableCell>
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
                                <TableCell>{row.UserName}</TableCell>
                                <TableCell>{row.EventId}</TableCell>
                                <TableCell>{row.EventDescription}</TableCell>
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