import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function CreateEventDialog ({open, handleClose, data}) {
    const [description,setDescription] = React.useState("");
    const [date_time,setDatetime] = React.useState("");
    const [location_id, setLocation] = React.useState("");
    const [cost,setCost] = React.useState(0);

    const AddEvent = async () =>
    {
      const newEvent = {description, date_time, location_id, cost} ;
      //console.log(`NEW EVENT Location ID ${location_id}`) ; 
      const response = await fetch("/events",{
        method: "POST",
        body: JSON.stringify(newEvent),
        headers:{'Content-Type': 'application/json'}
      });

      if (response.status === 201){
        alert("Successfully created the new Event!");
        handleClose();
      } else {
        const errorResponse = await response.json();
        alert(`Category not added. Please check that all required fields are entered. Status code = ${response.status}, message = ${errorResponse.message}`);
      }
    }

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
            onChange={(e)=>{setDescription(e.target.value)}}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            type="datetime-local"
            onChange={(e)=>{setDatetime(e.target.value)}}
            />
          <br />
          <TextField
            variant="standard"
            required
            margin="dense"
            label="Cost"
            id="cost"
            type="number"
            onChange={(e) =>{setCost(e.target.value)}}
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
              defaultValue={""}
              onChange={(e)=>{setLocation(e.target.value)}}
            >
              {data.map((event_row,i) =>
                <MenuItem key = {i} value = {event_row.LocationId}>
                  {event_row.City}
                </MenuItem>)}
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={AddEvent}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
}