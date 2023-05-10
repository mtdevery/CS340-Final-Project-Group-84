import React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CreateEventDialog from '../Components/CreateEventDialog';
import { Edit, Delete } from '@mui/icons-material/';

const data = [
    { EventId: 1, Time: '08/18/2023 1:00 AM', Description: 'Bridal Party for Abbie', Cost: 17.93, LocationId: 1},
    { EventId: 2, Time: '06/22/2023 4:58 PM', Description: 'Rolling Stones Concert', Cost: 37.97, LocationId: 2},
    { EventId: 3, Time: '06/07/2023 4:17 PM', Description: 'Sunset Film Festival', Cost: 23.84, LocationId: 3},
    { EventId: 4, Time: '02/06/2023 6:06 AM', Description: 'Live Band Karaoke', Cost: 39.73, LocationId: 2},
    { EventId: 5, Time: '11/08/2023 8:00 AM', Description: 'Abbie\'s Wedding', Cost: 2.60, LocationId: 1}
];

function EventsPage(){
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
            <h2>Events</h2>
            <p>
                This page would be the main display for our website. It displays all the upcoming events and allows for editing and deleting.
                Use the button below to create a new event.
            </p>
            <Button sx={{ marginBottom: "5px" }} variant="outlined" onClick={handleClickOpen}>
                Add a new event
            </Button>
            <CreateEventDialog open={open} handleClose={handleClose} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Events Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Cost (USD)</TableCell>
                            <TableCell>Location ID</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.EventId}
                            >
                                <TableCell>{row.EventId}</TableCell>
                                <TableCell>{row.Time}</TableCell>
                                <TableCell>{row.Description}</TableCell>
                                <TableCell>{row.Cost}</TableCell>
                                <TableCell>{row.LocationId}</TableCell>
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

export default EventsPage;