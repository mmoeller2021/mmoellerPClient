import { DialogContent } from "@mui/material";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { getTechRequests } from "../apiService/techRequestService";
import TechRequestForm from "./TechRequestForm";

interface TechRequestDialogProps {
  open: boolean;
  selectedValue?: string;
  onClose?: (value: string) => void;
  handleCloseDialog?: () => void;
}

export interface TechnicalRequest {
  id: number;
  email: string;
  description: string;
  dueDate: any;
}

const TechRequestDialog = (props: TechRequestDialogProps) => {
  const { open, handleCloseDialog } = props;

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Technical Request Form</DialogTitle>
      <DialogContent>
        <TechRequestForm handleCloseDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default TechRequestDialog;
