import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CreateEventCategoryDialog from '../Components/CreateEventCategoryDialog';


function EventCategoriesPage(){
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true); };
    const handleClose = () => {setOpen(false); };
    const [EventsCategoriesData,setEventsCategoriesData] = React.useState([]);
    const loadEventsCategories = async () =>{
        const response = await fetch("/eventscategories");
        const EventsCategoriesData = await response.json();
        setEventsCategoriesData(EventsCategoriesData);
    }
    React.useEffect(() => { loadEventsCategories();}, []);

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
            <CreateEventCategoryDialog open={open} handleClose={handleClose} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="EventCategories Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event ID</TableCell>
                            <TableCell>Category ID</TableCell>
                            <TableCell> Time </TableCell>
                            <TableCell> Event Description</TableCell>
                            <TableCell> Event Country </TableCell>
                            <TableCell> City </TableCell>
                            <TableCell> Street Address</TableCell>                                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {EventsCategoriesData.map((row,i) => (
                            <TableRow
                                key={i}
                            >
                                <TableCell>{row.EventId}</TableCell>
                                <TableCell>{row.CategoryId}</TableCell>
                                <TableCell>{row.Time}</TableCell>
                                <TableCell>{row.Event_Description} </TableCell>
                                <TableCell>{row.Country}</TableCell>
                                <TableCell>{row.City}</TableCell>
                                <TableCell>{row.StreetAddress}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default EventCategoriesPage;