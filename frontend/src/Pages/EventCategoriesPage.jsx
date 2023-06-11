import React from 'react';
import {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CreateEventCategoryDialog from '../Components/CreateEventCategoryDialog';
import { Edit, Delete } from '@mui/icons-material/';
import EditEventCategorydialog from '../Components/EditEventCategory';

function EventCategoriesPage(){
    const [open, setOpen] = React.useState(false);
    const [EventsCategoriesData,setEventsCategoriesData] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true); 
    };

    const handleClose = () => {
        setOpen(false);
        loadEventsCategories();
    };

    const [CategoriesData,setCategoriesData] = React.useState([]);
    const [EventsData,setEventsData] = useState([]);
    const [editOpen,seteditOpen] = useState(false);

    const [EVCtoEdit,setEVCtoEdit]= useState('');
    const handleEditOpen = (EVC) =>{
        setEVCtoEdit(EVC);
        seteditOpen(true);
    };

    const handleEditClose = () => {
        seteditOpen(false);
        loadEventsCategories();
     };

    const loadEventsCategories = async () =>{
        const response = await fetch("/eventscategories");
        const EventsCategoriesData = await response.json();
        setEventsCategoriesData(EventsCategoriesData);

        const response2 = await fetch("/api/categories");
        const CategoriesData = await response2.json();
        setCategoriesData(CategoriesData);

        const response3 = await fetch("/api/events");
        const EventsData = await response3.json();
        setEventsData(EventsData);
    }

    React.useEffect(() => {
        loadEventsCategories()
        ;}, []);

    return(
        <>
            <h2>Event Categories</h2>
            <p>
                This page displays the intersection table used to manage the M:N relationship between events and categories.
                Use the button below to add a new category to an event.
            </p>
            <Button sx={{ marginBottom: "5px" }} variant="outlined" onClick={handleClickOpen}>
                Add a new event category
            </Button>
            <CreateEventCategoryDialog open={open} handleClose={handleClose} CategoriesData={CategoriesData} EventsData = {EventsData} />
            <EditEventCategorydialog EVC={EVCtoEdit} editOpen={editOpen} handleClose = {handleEditClose} CategoriesData = {CategoriesData} EventsData = {EventsData} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="EventCategories Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event ID</TableCell>
                            <TableCell>Category ID</TableCell>
                            <TableCell> Event Description</TableCell>
                            <TableCell> Category Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {EventsCategoriesData.map((row,i) => (
                            <TableRow
                                key={i}
                            >
                                <TableCell>{row.EventId}</TableCell>
                                <TableCell>{row.CategoryId}</TableCell>
                                <TableCell>{row.Event_Description} </TableCell>
                                <TableCell>{row.Category_Description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default EventCategoriesPage;