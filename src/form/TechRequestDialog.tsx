import { DialogContent } from "@mui/material";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import TechRequestForm from "./TechRequestForm";
import { TechRequestDialogProps } from "../interfaces";


const TechRequestDialog = (props: TechRequestDialogProps) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Technical Request Form</DialogTitle>
      <DialogContent>
        <TechRequestForm open={open} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default TechRequestDialog;
