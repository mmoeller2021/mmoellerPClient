import { Button, DialogActions, FormControl, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { useState } from "react";
import { addTechRequest } from "../apiService/techRequestService";

export interface TechnicalRequest {
    id: number;
    email: string;
    description: string;
    dueDate: any;
  } 

  interface TechRequestDialogProps {
    open?: boolean;
    selectedValue?: string;
    onClose?: (value: string) => void;
    handleCloseDialog?: () => void;
};

const TechRequestForm = (props: TechRequestDialogProps) => {
    const { handleCloseDialog } = props;
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs());
    const [emailError, setEmailError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [dueDateError, setDueDateError] = useState(false);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const yearAhead = dayjs().add(1, 'year');


    const handleEmail = (e: any) => {
        setEmail(e.target.value)
        const validateEmail = emailRegex.test(email);
        if(validateEmail){
            setEmailError(false);
        }
        else{
            setEmailError(true);
        }
    }

    const handleDescription = (e: any) => {
        setDescription(e.target.value)
        const validateDescription = description.length < 1000 || description.length > 100
        console.log(validateDescription, 'val desc')
        if(validateDescription){
            setDescriptionError(false);
        }
        else{
            setDescriptionError(true);
        }
    }

    const addTechnicalRequest = () => {
        const techRequest: TechnicalRequest = {
            email,
            description,
            dueDate,
            id: Math.floor(Math.random() * 10)
        }
        console.log(techRequest, 'tech request')
        addTechRequest(techRequest);
    };

    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
           <form>
        <FormControl>
            <TextField label='Email' variant='outlined' required 
            helperText={emailError ? 'Email must be valid and include @ sign.' : ''} 
            value={email}
            error={emailError} 
            onChange={handleEmail}
            />
        </FormControl>
        <FormControl>
            <TextField label='Description' variant='outlined' 
            required 
            multiline 
            helperText={descriptionError ? 'Description must be between 100 andd 1000 characters.' : ''} 
            value={description}
            
            onChange={handleDescription}
            />
            </FormControl>
            <FormControl>
            <DatePicker 
            label="Due Date" 
            disablePast
            maxDate={yearAhead}
            
            defaultValue={dayjs()}
            onChange={(e) => 
            setDueDate(e)}
            format="YYYY-MM-DD"/>
    
</FormControl>
           </form>
           <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={addTechnicalRequest}>Submit</Button>
           </DialogActions>
           </LocalizationProvider>
        </div>
    )
}

export default TechRequestForm;