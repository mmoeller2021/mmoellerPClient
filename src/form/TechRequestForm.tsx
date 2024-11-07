import {
  Alert,
  AlertColor,
  Button,
  DialogActions,
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
}

const TechRequestForm = (props: TechRequestDialogProps) => {
  const { handleCloseDialog } = props;
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>();
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs());
  const [emailError, setEmailError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const yearAhead = dayjs().add(1, "year");
  const validateEmail = emailRegex.test(email);
  const validateDescription =
    description.length >= 100 && description.length <= 1000;

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const setValidateEmail = () => {
    if (validateEmail) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const setValidateDescription = () => {
    if (validateDescription) {
      setDescriptionError(false);
    } else {
      setDescriptionError(true);
    }
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    setValidateEmail();
  };

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
    setValidateDescription();
  };

  const clearForm = () => {
    setDescription("");
    setEmail("");
  };

  const addTechnicalRequest = async () => {
    setAlertMessage("");
    setOpenAlert(false);
    setSeverity("info");
    const techRequest: TechnicalRequest = {
      email,
      description,
      dueDate,
      id: Math.floor(Math.random() * 10000),
    };

    setValidateEmail();
    setValidateDescription();

    if (!validateEmail || !validateDescription) {
      setAlertMessage("Please correct the errors in the form.");
      setSeverity("error");
      setOpenAlert(true);
      return;
    }

    try {
      const response = await addTechRequest(techRequest);
      if (response.status === 201) {
        setAlertMessage("Successfully added request!");
        setSeverity("success");
        clearForm();
      } else {
        setAlertMessage("Error adding request.");
        setSeverity("error");
      }
      setOpenAlert(true);
    } catch (error) {
      setAlertMessage("There is an internal error adding request.");
      setSeverity("error");
      setOpenAlert(true);
      console.error(error);
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form>
          <Stack spacing={2} paddingTop={1}>
            <FormControl>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <TextField
                variant="outlined"
                color="primary"
                id="email"
                required
                helperText={
                  emailError ? "Email must be valid and include @ sign." : ""
                }
                value={email}
                error={emailError}
                onChange={handleEmail}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Description:</FormLabel>

              <OutlinedInput
                id="description"
                type="text"
                required
                multiline
                value={description}
                onChange={handleDescription}
                inputProps={{
                  maxLength: 1000,
                }}
                error={descriptionError}
              ></OutlinedInput>
              {descriptionError ? (
                <FormHelperText error>
                  Description must be between 100 andd 1000 characters.
                </FormHelperText>
              ) : null}
            </FormControl>
            {/* no error handler for date bc the maxDate is a year from current date */}
            <FormControl>
              <FormLabel htmlFor="dueDate">Due Date:</FormLabel>
              <DatePicker
                disablePast
                maxDate={yearAhead}
                onChange={(e) => setDueDate(e)}
                format="MM-DD-YYYY"
              />
            </FormControl>
          </Stack>
        </form>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="contained" onClick={addTechnicalRequest}>
            Submit
          </Button>
        </DialogActions>
      </LocalizationProvider>
      {openAlert && (
        <Alert onClose={handleCloseAlert} severity={severity}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

export default TechRequestForm;
