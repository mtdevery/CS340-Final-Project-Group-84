import React from 'react';
import { useEffect,useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl, InputLabel, Select, MenuItem,TextField } from '@mui/material';


export default function EditEventCategorydialog({EVC,editOpen,handleClose,CategoriesData}){
    const [editCategoryId,seteditCategoryId] = useState('');
    const postEVC = async (CategoryId) =>
    {
        const updated_EVC = {EventId:editCategoryId, CategoryId:editCategoryId}
        console.log(updated_EVC)
            const response = await fetch(`/eventscategories/`, {
            method: 'PUT',
            body: JSON.stringify(updated_EVC),
            headers: {'Content-Type': 'application/json',}
        });
    }

    return(
        <Dialog open ={editOpen} onClose = {handleClose}>
            <DialogTitle> Edit Event Category</DialogTitle>
            <DialogContent>
                <DialogContentText> Use the fields below to modify an existing Event's Category</DialogContentText>
                <InputLabel> Events </InputLabel>
                <Select
                    autoFocus
                    margin="dense"
                    id="CateogryId"
                    label="Category"
                    fullWidth
                    required
                    defaultValue= {EVC.EventId}
                    onChange ={e=> seteditCategoryId(e.target.value) }
                >
                {CategoriesData.map((row,i) =>(
                    <MenuItem key = {i} value = {row.CategoryId}>
                        {row.CategoryId}  - {row.Description}
                    </MenuItem>
                ))}
                </Select>
                <InputLabel> Category </InputLabel>
                <Select
                    autoFocus
                    margin="dense"
                    id="CateogryId"
                    label="Category"
                    fullWidth
                    required
                    defaultValue= {EVC.CategoryId }
                    onChange ={e=> seteditCategoryId(e.target.value) }
                >
                {CategoriesData.map((row,i) =>(
                    <MenuItem key = {i} value = {row.CategoryId}> {row.CategoryId}  - {row.Description} </MenuItem>
                ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick = {handleClose} >Cancel</Button>
                <Button onClick ={postEVC}> Submit </Button>
            </DialogActions>
        </Dialog>
    )


}