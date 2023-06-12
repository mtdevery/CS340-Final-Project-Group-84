import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function CreateUserEventDialog (props) {
    // Assign variables to passed in parameters
    const {open, onClose, userEvent} = props;

    // Define useState hooks to handle opening dialogs and setting the displayed data
    const [userId, setUserId] = React.useState('');
    const [eventId, setEventId] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [events, setEvents] = React.useState([]);

    // Function to UPDATE a user event using a fetch call to the server api
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
          const errorResponse = await response.json();
          alert(`User Event not added. Please check that all required fields are entered. Status code = ${response.status}, message = ${errorResponse.message}`);
      }
    };

    // Function to load in user and event data to populate the dynamic Select dropdown
    const loadData = async () => {
      const userResponse = await fetch('/api/users/');
      const usersData = await userResponse.json();
      setUsers(usersData);

      const eventResponse = await fetch('/api/events');
      const eventData = await eventResponse.json();
      setEvents(eventData);
    };

    // Function to close the dialog
    const handleClose = () => {
      onClose();
    };

    // Set the selected user event passed in as a parameter from the main page
    React.useEffect(() => {
      if(userEvent !== undefined){
        setUserId(userEvent.UserId);
        setEventId(userEvent.EventId);
      }
    },[userEvent]);

    // Dynamically populate Select dropdown data using useEffect hook on page load
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
                {users.map((item) => (
                  <MenuItem value={item.UserId}>{item.Name}</MenuItem>
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
              required
              value={eventId}
              variant="standard"
              label="Location"
              onChange={e => setEventId(e.target.value)}
            >
                {events.map((item) => (
                  <MenuItem value={item.EventId}>{item.Description}</MenuItem>
                ))}
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
