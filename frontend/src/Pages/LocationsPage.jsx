import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CreateLocationDialog from '../Components/CreateLocationDialog';

function LocationsPage(){
    const [open, setOpen] = React.useState(false);
    const [location_list,setLocationList] = React.useState([])
    const load_locations_data =  async () =>{
        const response = await fetch("./locations") ;
        const location_data =  await response.json()
        setLocationList(location_data);
    }

    const handleDelete = async(Location_Obj) =>{
        const LocationId = Location_Obj.LocationId
        const response = await fetch(`/locations/${LocationId}`, { method: 'DELETE' });
        if (response.status === 204) {
            alert('Successfully was sucessfully removed')
        } else {
            console.error(`Failed to delete Location date for: ${LocationId} , status code = ${response.status}`);
        }
        //console.log("handle delete triggered");
        load_locations_data();
    }

    const handleClickOpen = () => { setOpen(true);};
    const handleClose = () => { setOpen(false); };
    React.useEffect(()=> {load_locations_data();}, [] );
    return(
        <>
            <h2>Locations</h2>
            <p>
                This page displays the information about the locations that events are hosted at. This table has a 1:M
                relationship with events since more than one event may be hosted at the same location.
                Use the button below to add a new location.
            </p>
            <Button sx={{ marginBottom: "5px" }} variant="outlined" onClick={handleClickOpen}>
                Add a new location
            </Button>
            <CreateLocationDialog open={open} handleClose={handleClose} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Locations Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Street Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Postal Code</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell> Edit </TableCell>
                            <TableCell> Delete </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {location_list.map((row,i) => (
                            <TableRow
                                key={i}
                            >
                                <TableCell>{row.LocationId}</TableCell>
                                <TableCell>{row.StreetAddress}</TableCell>
                                <TableCell>{row.City}</TableCell>
                                <TableCell>{row.PostalCode}</TableCell>
                                <TableCell>{row.Country}</TableCell>
                                <TableCell><Button onClick={()=>{console.log("edit button clicked, to be implemented later")}} startIcon={<Edit/>}/></TableCell>
                                <TableCell><Button onClick ={()=>{handleDelete(row.LocationId)}}startIcon = {<Delete color = "error"/> }/> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default LocationsPage;

/*
 *@todo PUT/ edit button is not working
 *
 */