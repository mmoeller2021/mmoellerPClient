export interface TechRequestDialogProps {
  open: boolean;
  selectedValue?: string;
  onClose?: () => void;
}

export interface TechnicalRequest {
  id: number;
  email: string;
  description: string;
  dueDate: string;
}