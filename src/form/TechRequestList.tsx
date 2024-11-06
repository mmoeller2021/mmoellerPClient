import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

import { Card } from 'primereact/card';
        
        
import { TechnicalRequest } from "../apiService/techRequestService";

interface ListProps {
    techRequests: TechnicalRequest[];
    open: boolean;
    onClose?: (value: string) => void;
}

const TechRequestList = (props: ListProps) => {

    const {techRequests, open, onClose} = props;

    const itemTemplate = (techRequests: TechnicalRequest, index: number) => {
        return (
                <Card key={techRequests.id} title={techRequests.email} subTitle={techRequests.id}>
                    <p>{techRequests.description}</p>
                    <p>Due Date:</p>
                    {/* {techRequests.dueDate} */}
                </Card>

        )
    }

    const listTemplate = (requests: TechnicalRequest[]) => {
        if (!requests|| requests.length === 0) return null;

        let list = requests.map((requests, index) => {
            return itemTemplate(requests, index);
        });

        return <div>{list}</div>; 
    }

    return(
        <div>
    <Dialog open={open} maxWidth='md' fullWidth onClose={onClose}>
        <DialogTitle>List of Technical Requests</DialogTitle>
        <DialogContent sx={{maxWidth: '97%'}}>    
            <DataTable value={techRequests} tableStyle={{display: 'inline', maxWidth: '80%'}}
            sortField="dueDate" sortOrder={-1}> 
    <Column field="id" header="Id"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="description" header="Description" style={{ width: '20%' }}></Column>
    <Column field="dueDate" header="Due Date" sortable></Column>,

    </DataTable></DialogContent>
    {/* <DataView  value={techRequests} listTemplate={listTemplate} /> */}

    </Dialog>
        </div>
    )
}

export default TechRequestList;