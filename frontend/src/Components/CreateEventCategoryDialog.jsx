import {useState,useEffect} from 'react';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';

export default function CreateEventCategoryDialog (props) {
    const {open, handleClose, CategoriesData,EventsData} = props;

    const [EventId,setEventId] = useState('');
    const [CategoryId,setCategoryId] = useState('');
    const [EventsCategoriesData,setEVData] = useState([]); 

    const createEventCategory = async () =>
    {
      const newEventCategory = {EventId:EventId,CategoryId:CategoryId}
      const response = await fetch('/eventscategories',{
        method: 'POST',
        body: JSON.stringify(newEventCategory),
        headers: {'Content-Type': 'application/json',}
      });
      if (response.status == 201){
        alert("New Event Category Created");
        closeEVC();
      } else{
        console.log("Event Category creation failed ");
        const errorResponse = await response.json();
        alert(`Category not added. Please check that all required fields are entered. Status code = ${response.status}, message = ${errorResponse.message}`);
      }
    }

    const closeEVC = () => handleClose();

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
              defaultValue={""}
              onChange = {e=>setEventId(e.target.value)}
            >
               {EventsData.map((event_row,i) =>
                <MenuItem key = {i} value = {event_row.EventId}>
                  {event_row.EventId} - {event_row.Description}
                </MenuItem>)}
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
              defaultValue={""}
              onChange={e=>setCategoryId(e.target.value)}
            >
              {CategoriesData.map((category,i) =>
                <MenuItem key = {i} value = {category.CategoryId}>
                  {category.CategoryId} - {category.Description}
                </MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createEventCategory}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
}
