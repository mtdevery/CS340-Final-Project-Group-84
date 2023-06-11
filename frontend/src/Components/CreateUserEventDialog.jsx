import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function CreateUserEventDialog (props) {
    const {open, onClose} = props;

    const [userId, setUserId] = React.useState('');
    const [eventId, setEventId] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [events, setEvents] = React.useState([]);

    const createUserEvent = async () => {
      const newUserEvent = { UserId: userId, EventId: eventId };
      const response = await fetch('/api/userevents', {
          method: 'POST',
          body: JSON.stringify(newUserEvent),
          headers: {
              'Content-Type': 'application/json',
          }
      });
      if (response.status === 201){
          alert('Successfully added event');
          handleClose();
      } else {
          const errorResponse = await response.json();
          alert(`User Event not added. Please check that all required fields are entered. Status code = ${response.status}, message=${errorResponse.message}`);
      }
    };

    const loadData = async () => {
      const userResponse = await fetch('/api/users/');
      const usersData = await userResponse.json();
      setUsers(usersData);

      const eventResponse = await fetch('/api/events');
      const eventData = await eventResponse.json();
      setEvents(eventData);
    };

    const handleClose = () => {
      onClose();
    };

    React.useEffect(() => {
      loadData();
    }, []);

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
                {users.map((item,i) => (
                  <MenuItem key = {i} value={item.UserId}>{item.Name}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl 
            fullWidth
            margin="normal"
            >
            <InputLabel>Event</InputLabel>
            <Select
              margin="dense"
              required={true}
              value={eventId}
              variant="standard"
              label="Location"
              onChange={e => setEventId(e.target.value)}
            >
                {events.map((item,i) => (
                  <MenuItem key = {i} value={item.EventId}>{item.Description}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createUserEvent} type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    );
}
