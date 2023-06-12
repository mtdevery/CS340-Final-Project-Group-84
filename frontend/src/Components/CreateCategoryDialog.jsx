import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@mui/material';

export default function CreateCategoryDialog (props) {
    // Assign variables to passed in parameters
    const {open, onClose} = props;

    // Define useState hooks to handle creating the category object from the form
    const [categoryName, setCategoryName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Function to CREATE a user using a fetch call to the server api
    const createCategory = async () => {
      const newCategory = { CategoryName: categoryName, Description: description };
      const response = await fetch('/api/categories', {
          method: 'POST',
          body: JSON.stringify(newCategory),
          headers: {
              'Content-Type': 'application/json',
          }
      });
      if (response.status === 201){
          alert('Successfully added category');
          handleClose();
      } else {
          const errorResponse = await response.json();
          alert(`Category not added. Please check that all required fields are entered. Status code = ${response.status}, message = ${errorResponse.message}`);
      }
    };
    
    // Function to close the dialog
    const handleClose = () => {
      onClose();
    };

    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new category please fill out all the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            fullWidth
            required
            variant="standard"
            onChange={e => setCategoryName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            required
            multiline
            variant="standard"
            onChange={e => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createCategory}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
}
