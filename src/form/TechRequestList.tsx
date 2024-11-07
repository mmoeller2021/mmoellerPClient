import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import {
  getTechRequests,
  TechnicalRequest,
} from "../apiService/techRequestService";
import { useState, useEffect, useCallback } from "react";

interface ListProps {
  techRequests?: TechnicalRequest[];
  open: boolean;
  onClose?: (value: string) => void;
}

const TechRequestList = (props: ListProps) => {
  const { open, onClose } = props;

  const [technicalRequests, setTechRequests] = useState<TechnicalRequest[]>([]);

  const fetchTechnicalRequests = useCallback(async () => {
    const response = await getTechRequests();
    setTechRequests(response.data);
  }, [open]);

  useEffect(() => {
    fetchTechnicalRequests();
  }, [open, fetchTechnicalRequests]);

  return (
    <div>
      <Dialog open={open} maxWidth="lg" fullWidth onClose={onClose}>
        <DialogTitle>List of Technical Requests</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <DataTable
            scrollable
            scrollHeight="flex"
            style={{flex: 1}}
            width="auto"
            value={technicalRequests}
            emptyMessage="There are no technical requests."
            sortField="dueDate"
            sortOrder={-1}
          >
            <Column field="id" header="Id"  style={{maxWidth: '40px'}}></Column>
            <Column field="email" header="Email" style={{maxWidth: '150px'}}></Column>
            <Column
              field="description"
              header="Description"
              style={{maxWidth: '170px'}}
              body={(rowData) => (
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {rowData.description}
                </div>
              )}
            ></Column>
            <Column field="dueDate" header="Due Date" sortable  style={{maxWidth: '60px'}}></Column>
          </DataTable>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TechRequestList;
