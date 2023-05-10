import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button, Input, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function CreateEventDialog ({open, handleClose}) {
    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new event please fill out all the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            required
            multiline
            variant="standard"
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            type="datetime-local"
            />
          <br />
          <TextField
            variant="standard"
            required
            margin="dense"
            label="Cost"
            id="cost"
            type="number"
            />
            <br />
          <FormControl 
            fullWidth
            margin="dense"
            >
            <InputLabel>Location</InputLabel>
            <Select
              margin="dense"
              variant="standard"
              label="Location"
            >
                <MenuItem value={'Eugene'}>Eugene</MenuItem>
                <MenuItem value={'Springfield'}>Springfield</MenuItem>
                <MenuItem value={'Corvallis'}>Corvallis</MenuItem>
                <MenuItem value={'San Ramon'}>San Ramon</MenuItem>
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
}