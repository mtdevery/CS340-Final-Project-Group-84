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

const data = [
    { LocationId: 1, StreetAddress: '111 Local Street', City: 'Eugene', PostalCode: 11111, Country: 'United States'},
    { LocationId: 2, StreetAddress: '101 Event Street', City: 'Springfield', PostalCode: 11010, Country: 'United States'},
    { LocationId: 3, StreetAddress: '000 Nowhere Road', City: 'Corvallis', PostalCode: 10000, Country: 'United States'},
    { LocationId: 4, StreetAddress: '60025 Bollinger Canyon Road', City: 'San Ramon', PostalCode: 94583, Country: 'United States'}
]

function LocationsPage(){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <h2>Locations</h2>

            <Button sx={{ marginBottom: "5px" }} variant="outlined" onClick={handleClickOpen}>
                Add a new location
            </Button>
            <CreateLocationDialog open={open} handleClose={handleClose} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Categories Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Street Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Postal Code</TableCell>
                            <TableCell>Country</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.EventId}
                            >
                                <TableCell>{row.LocationId}</TableCell>
                                <TableCell>{row.StreetAddress}</TableCell>
                                <TableCell>{row.City}</TableCell>
                                <TableCell>{row.PostalCode}</TableCell>
                                <TableCell>{row.Country}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default LocationsPage;