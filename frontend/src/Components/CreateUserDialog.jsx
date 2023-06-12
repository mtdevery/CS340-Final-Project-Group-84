import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@mui/material';

export default function CreateUserDialog (props) {
    // Assign variables to passed in parameters
    const {open, onClose} = props;

    // Define useState hooks to handle creating the user object from the form
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    // Function to CREATE a user using a fetch call to the server api
    const createUser = async () => {
      const newUser = { Name: name, Email: email };
      const response = await fetch('api/users', {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {
              'Content-Type': 'application/json',
          }
      });
      if (response.status === 201){
          alert('Successfully added user');
          handleClose();
      } else {
          const errorResponse = await response.json();
          alert(`User not added. Please check that all required fields are entered. Status code = ${response.status}, message = ${errorResponse.message}`);
      }
    };

    // Function to close the dialog
    const handleClose = () => {
      onClose();
    };

    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new category please fill out all the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={name}
            fullWidth
            required
            variant="standard"
            onChange={e => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Email"
            type="email"
            value={email}
            fullWidth
            required
            variant="standard"
            onChange={e => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createUser}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
}
