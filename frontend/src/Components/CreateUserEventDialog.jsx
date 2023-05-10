import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function CreateUserEventDialog ({open, handleClose}) {
    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe User to an Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new category please fill out all the fields below.
          </DialogContentText>
          <FormControl 
            fullWidth
            margin="normal"
            >
            <InputLabel>User</InputLabel>
            <Select
              margin="dense"
              variant="standard"
              label="Location"
            >
                <MenuItem value={'Abbie Cooper'}>Abbie Cooper</MenuItem>
                <MenuItem value={'Hans Dressler'}>Hans Dressler</MenuItem>
                <MenuItem value={'Lila Blanchard'}>Lila Blanchard</MenuItem>
                <MenuItem value={'Christina Campbell'}>Christina Campbell</MenuItem>
                <MenuItem value={'Guerete Fernandes'}>Guerete Fernandes</MenuItem>
            </Select>
          </FormControl>
          <FormControl 
            fullWidth
            margin="normal"
            >
            <InputLabel>Event</InputLabel>
            <Select
              margin="dense"
              variant="standard"
              label="Location"
            >
                <MenuItem value={'Bridal Party for Abbie'}>Bridal Party for Abbie</MenuItem>
                <MenuItem value={'Rolling Stones Concert'}>Rolling Stones Concert</MenuItem>
                <MenuItem value={'Sunset Film Festival'}>Sunset Film Festival</MenuItem>
                <MenuItem value={'Live Band Karaoke'}>Live Band Karaoke</MenuItem>
                <MenuItem value={'Abbie\'s Wedding'}>Abbie's Wedding</MenuItem>
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
