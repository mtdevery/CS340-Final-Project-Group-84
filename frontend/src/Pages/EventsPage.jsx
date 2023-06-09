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
import EditEventDialog from "../Components/EditEventDialog";
import moment from 'moment';


function EventsPage(){
    const [open, setOpen] = React.useState(false);
    const [data,setData] = useState([]);
    const [location_list, setLocationList] = useState([]);
    const [editOpen,seteditOpen] = useState(false);
    const [editEvent,seteditEvent] = useState('');
    const handleEditOpen = (EventRow) =>{
        //console.log(EventRow)
        seteditOpen(true);
        seteditEvent(EventRow);
    };

    const handleEditClose = () => {
        seteditOpen(false);
        loadData();
     };
    const loadData = async() => {
        const response = await fetch("/api/events");
        const data = await response.json();
        setData(data);

        const response2 = await fetch("/api/locations");
        const location_list = await response2.json();
        setLocationList(location_list);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        loadData();
    };

    const handleDelete = async (id) => {
        const response = await fetch(`/events/${id}`,{method: "DELETE" }) // currently nothing but status is returned
        if (response.status === 204) {
            console.log('successful delete on backend');
        } else {
            const errorResponse = await response.json();
            alert(`Category not added. Please check that all required fields are entered. Status code = ${response.status}, message = ${errorResponse.message}`);
        }
        loadData();
    };
    useEffect(()=> {loadData();}, [] );

    return(
        <>
            <h2>Events</h2>
            <p>
                This page would be the main display for our website. It displays all the upcoming events and allows for editing and deleting.
                Use the button below to create a new event. On this page you can also use the dropdown on the right of the table to filter 
                the view to a single location.
            </p>
            <span style={{display:"flex", justifyContent:"space-between"}}>
                <Button sx={{ marginBottom: "5px" }} variant="outlined" onClick={handleClickOpen}>
                    Add a new event
                </Button>
            </span>
            <CreateEventDialog open={open} handleClose={handleClose} data ={location_list} />
            <EditEventDialog editOpen = {editOpen} handleClose = {handleEditClose} Event = {editEvent} Locations = {location_list}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Events Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Cost (USD)</TableCell>
                            <TableCell>Location ID</TableCell>
                            <TableCell>Location</TableCell>
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
                                <TableCell>{moment(row.Time).format("dddd, MMMM Do YYYY h:mm:ss a")}</TableCell>
                                <TableCell>{row.Description}</TableCell>
                                <TableCell>{row.Cost.toLocaleString('en-US', {     
                                                style: 'currency',     
                                                currency: 'USD',})}</TableCell>
                                <TableCell>{row.LocationId || "NULL" }</TableCell>
                                <TableCell>{row.City || "NULL"}</TableCell>
                                <TableCell><Button onClick={()=>{handleEditOpen(row)}} startIcon={<Edit />}></Button></TableCell>
                                <TableCell><Button onClick={()=> handleDelete(row.EventId)} startIcon={<Delete color='error' />}></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default EventsPage;