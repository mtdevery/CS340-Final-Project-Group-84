import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@mui/material';

export default function CreateLocationDialog ({open, handleClose}) {
    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new category please fill out all the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Street Address"
            fullWidth
            required
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="City"
            fullWidth
            required
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Postal Code"
            type='number'
            fullWidth
            required
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Country"
            fullWidth
            required
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
}
