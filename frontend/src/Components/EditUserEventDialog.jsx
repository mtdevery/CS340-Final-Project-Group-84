import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function CreateUserEventDialog (props) {
    const {open, onClose, userEvent} = props;
    const [userId, setUserId] = React.useState('');
    const [eventId, setEventId] = React.useState('');

    const editUserEvent = async () => {
      const newUserEvent = { UserId: userId, EventId: eventId };
      const response = await fetch(`/api/userevents/${userEvent.UserId}/${userEvent.EventId}`, {
          method: 'PUT',
          body: JSON.stringify(newUserEvent),
          headers: {
              'Content-Type': 'application/json',
          }
      });
      if (response.status === 201){
          alert('Successfully updated user event');
          handleClose();
      } else {
          alert(`User Event not added. Please check that all required fields are entered. Status code = ${response.status}`);
      }
    };

    const handleClose = () => {
      onClose();
    };

    React.useEffect(() => {
      if(userEvent !== undefined){
        setUserId(userEvent.UserId);
        setEventId(userEvent.EventId);
      }
    },[userEvent]);

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
              required
              value={userId}
              variant="standard"
              label="Location"
              onChange={e => setUserId(e.target.value)}
            >
                <MenuItem value={1}>Abbie Cooper</MenuItem>
                <MenuItem value={2}>Hans Dressler</MenuItem>
                <MenuItem value={3}>Lila Blanchard</MenuItem>
                <MenuItem value={4}>Christina Campbell</MenuItem>
                <MenuItem value={5}>Guerete Fernandes</MenuItem>
            </Select>
          </FormControl>
          <FormControl 
            fullWidth
            margin="normal"
            >
            <InputLabel>Event</InputLabel>
            <Select
              margin="dense"
              required
              value={eventId}
              variant="standard"
              label="Location"
              onChange={e => setEventId(e.target.value)}
            >
                <MenuItem value={1}>Bridal Party for Abbie</MenuItem>
                <MenuItem value={2}>Rolling Stones Concert</MenuItem>
                <MenuItem value={3}>Sunset Film Festival</MenuItem>
                <MenuItem value={4}>Live Band Karaoke</MenuItem>
                <MenuItem value={5}>Abbie's Wedding</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editUserEvent}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
}
