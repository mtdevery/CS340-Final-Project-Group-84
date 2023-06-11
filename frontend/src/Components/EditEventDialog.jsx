import React,{useState,useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button,TextField ,FormControl, InputLabel, Select, MenuItem } from '@mui/material';
const moment = require('moment');


//{editOpen,handleEditClose,editEvent}

export default function EditEventDialog ({editOpen,handleClose,Event,Locations}){
    const [eventId, setEventId] = React.useState('');
    const [eventTime,setEventTime] =React.useState(moment(Event.Time).format('YYYY-MM-DD HH:mm:ss'));
    const [eventDescription,seteventDescription]= React.useState('');
    const [eventCost,seteventCost] = React.useState(0);
    const [eventLocationID,seteventLocationID] = React.useState('');

    const editEvent = async () =>
    {
        const updated_event = {EventId:eventId, Time:eventTime, Description:eventDescription,Cost:parseFloat(eventCost),LocationId: eventLocationID};
        const response = await fetch(`/events/${eventId}`, {
            method: 'PUT',
            body: JSON.stringify(updated_event),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.status === 200){
            alert(`Sucessfully Updated event details`);
        }else{
            alert("event not added check data within fields");
        }
        handleClose()
    }

    useEffect(() =>{
        if(Event !== undefined){
            setEventId(Event.EventId)
            setEventTime(moment(Event.Time).format('YYYY-MM-DD HH:mm:ss'))
            seteventDescription(Event.Description)
            seteventCost(Event.Cost)
            seteventLocationID(Event.LocationId)
        } },[Event]);
    return(
        <Dialog open = {editOpen} onClose = {handleClose} >
            <DialogTitle> Edit Event</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the chosen event using the fields below
                </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Event's Description"
                        fullWidth
                        required
                        multiline
                        variant="standard"
                        defaultValue={Event.Description }
                        onChange={ e => seteventDescription(e.target.value)}
                    />

                    <TextField
                        variant="standard"
                        fullWidth
                        required
                        margin="dense"
                        label="Cost"
                        id="cost"
                        type="number"
                        defaultValue={Event.Cost}
                        onChange = {e => seteventCost(e.target.value)}
                    />
                    <Select
                        margin="dense"
                        variant="standard"
                        label="Location"
                        fullWidth
                        onChange = {e=>seteventLocationID(e.target.value)}
                        defaultValue={Event.LocationId || -1 }
                    >
                        {Locations.map((location_row,i) => (
                        <MenuItem value={location_row.LocationId} key = {i}>
                            City:{location_row.City} - LocationId:{location_row.LocationId }
                        </MenuItem>
                        ))}
                        <MenuItem value = {-1}> NULL </MenuItem>

                    </Select>

                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        label = "Date/Time"
                        type="datetime-local"
                        defaultValue= {moment(Event.Time).format('YYYY-MM-DD HH:mm:ss')}
                        onChange = {
                            e => {setEventTime(e.target.value)}}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick = {editEvent}> Submit </Button>
            </DialogActions>
        </Dialog>
    );

}
