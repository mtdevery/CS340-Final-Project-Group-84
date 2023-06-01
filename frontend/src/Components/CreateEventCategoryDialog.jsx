import {useState,useEffect} from 'react';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';

export default function CreateEventCategoryDialog ({open, handleClose}) {
  const open = {open};
  const handleClose = {handleClose};

  const [EventId,setEventId] = useState('');
  const [CategoryId,setCategoryId] = useState('');
  const [EventsCategoriesData,setEVData] = useState([]); // for later making POST

  const createEventCategory = async () =>
  {
    const newEventCategory = {EventId,CategoryId}
    const response = await fetch('/eventscategories',{
      method: 'POST',
      body: JSON.stringify(newEventCategory),
      headers: {'Content-Type': 'application/json',}
    });
    if (response.status == 201){
      alert("New Event Category Created");
      handleClose();
    } else{
      console.log("Event Category creation failed ");
    }
  }


    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Category to an Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new category please fill out all the fields below.
          </DialogContentText>
          <FormControl
            fullWidth
            margin="normal"
            >
            <InputLabel>Event</InputLabel>
            <Select
              margin="dense"
              variant="standard"
              label="Event"
            >
                <MenuItem value={'Bridal Party for Abbie'}>Bridal Party for Abbie</MenuItem>
                <MenuItem value={'Rolling Stones Concert'}>Rolling Stones Concert</MenuItem>
                <MenuItem value={'Sunset Film Festival'}>Sunset Film Festival</MenuItem>
                <MenuItem value={'Live Band Karaoke'}>Live Band Karaoke</MenuItem>
                <MenuItem value={"Abbie's Wedding"}>Abbie's Wedding</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            >
            <InputLabel>Category</InputLabel>
            <Select
              margin="dense"
              variant="standard"
              label="Category"
            >
                <MenuItem value={'Indoor'}>Indoor</MenuItem>
                <MenuItem value={'Tournament'}>Chess</MenuItem>
                <MenuItem value={'Wedding'}>Wedding</MenuItem>
                <MenuItem value={'Concert'}>Concert</MenuItem>
                <MenuItem value={'Outdoor'}>Outdoor</MenuItem>
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
