import {
  Alert,
  AlertColor,
  Button,
  DialogActions,
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  Snackbar,
  Stack,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useState } from "react";
import { addTechRequest } from "../apiService/techRequestService";

import { TechnicalRequest, TechRequestDialogProps } from "../interfaces";

const TechRequestForm = (props: TechRequestDialogProps) => {
  const { onClose } = props;
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>();
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState<string>("");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const yearAhead = dayjs().add(1, "year");
  const validatedEmail = emailRegex.test(email);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const validateEmail = () => {
    if (validatedEmail) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const validateDescription = () => {
    if (description.length < 100) {
      setDescriptionError(true);
      setDescriptionErrorMessage(
        "Description is too short. It must be at least 100 characters."
      );
      return false;
    } else if (description.length > 1000) {
      setDescriptionError(true);
      setDescriptionErrorMessage(
        "Description is too long. It must be no more than 1000 characters."
      );
      return false;
    } else {
      setDescriptionError(false);
      setDescriptionErrorMessage("");
      return true;
    }
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    validateEmail();
  };

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
    validateDescription();
  };

  //no dueDate validation bc the calendar will only allow valid dates up to a year ahead starting from the current date
  const handleDueDate = (e: any) => {
    setDueDate(dayjs(e).format("YYYY-MM-DD"));
  };

  const clearForm = () => {
    setDescription("");
    setEmail("");
    setDueDate('');
  };

  const addTechnicalRequest = async () => {
    const techRequest: TechnicalRequest = {
      email,
      description,
      dueDate,
      id: Math.floor(Math.random() * 10000),
    };

    validateEmail();
    validateDescription();

    if (emailError || descriptionError) {
      setAlertMessage("Please correct the errors in the form.");
      setSeverity("error");
      setOpenAlert(true);
    } else {
      try {
        const response = await addTechRequest(techRequest);
        if (response?.status === 201) {
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
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form>
          <Stack spacing={2} paddingTop={1}>
            <FormControl>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <OutlinedInput
                id="email"
                required
                value={email}
                error={emailError}
                onChange={handleEmail}
              />
                   {emailError ? (
                <FormHelperText error>This email is invalid.</FormHelperText>
              ) : null}
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
                  error={descriptionError}
                  />
              {descriptionError ? (
                <FormHelperText error>{descriptionErrorMessage}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dueDate">Due Date:</FormLabel>
              <DatePicker
                disablePast
                maxDate={yearAhead}
                onChange={handleDueDate}
                format="MM-DD-YYYY"
              />
            </FormControl>
          </Stack>
        </form>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={addTechnicalRequest}>
            Submit
          </Button>
        </DialogActions>
      </LocalizationProvider>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TechRequestForm;
