import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@mui/material';

export default function CreateLocationDialog ({open, handleClose}) {
    const[StreetAddress,setStreetAddress] = useState('');
    const[City,setCity] = useState('');
    const[PostalCode,setPostalCode] = useState('');
    const[Country,setCountry] = useState('');
    
    const AddLocation = async() =>
    {
      const newLocation = {StreetAddress,City,PostalCode,Country}
      const response = await fetch("/locations",{
        method: "POST",
        body: JSON.stringify(newLocation),
        headers:{'Content-Type': 'application/json'}
      });
      if (response.status === 201){
        alert("Successful creation of entity");
      }
    }
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
            onChange={(e)=>{setStreetAddress(e.target.value)}}
          />
          <TextField
            margin="dense"
            id="description"
            label="City"
            fullWidth
            required
            variant="standard"
            onChange={(e)=>{setCity(e.target.value)}}
          />
          <TextField
            margin="dense"
            id="description"
            label="Postal Code"
            type='number'
            fullWidth
            required
            variant="standard"
            onChange={(e)=>{setPostalCode(e.target.value)}}
          />
          <TextField
            margin="dense"
            id="description"
            label="Country"
            fullWidth
            required
            variant="standard"
            onChange={(e)=>{setCountry(e.target.value)}}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={AddLocation}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
}
