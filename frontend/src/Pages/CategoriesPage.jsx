import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CreateCategoryDialog from '../Components/CreateCategoryDialog';

function CategoriesPage(){
    const [open, setOpen] = React.useState(false); 
    const [categories, setCategories] = React.useState([]); 

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        loadAllCategories();
    };

    const loadAllCategories = async () => {
        const response = await fetch('/api/categories');
        const categoriesData = await response.json();
        setCategories(categoriesData);
    };

    React.useEffect(() => {
        loadAllCategories();
    }, []);

    return(
        <>
            <h2>Categories</h2>
            <p>
                This page displays the various categories that our events can fall into. One event can have many associated categories to help users find events they
                are interested in.
                Use the button below to insert a new category into the collection.
            </p>
            <Button sx={{ marginBottom: "5px" }} variant="outlined" onClick={handleClickOpen}>
                Add a new category
            </Button>
            <CreateCategoryDialog open={open} onClose={handleClose} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Categories Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((row) => (
                            <TableRow
                                key={row.CategoryId}
                            >
                                <TableCell>{row.CategoryId}</TableCell>
                                <TableCell>{row.CategoryName}</TableCell>
                                <TableCell>{row.Description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CategoriesPage;