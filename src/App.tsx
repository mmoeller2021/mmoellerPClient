import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TechRequestDialog from './form/TechRequestDialog';
import TechRequestForm from './form/TechRequestForm';
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-blue/theme.css";
import { Button } from '@mui/material';
import { getTechRequests, TechnicalRequest } from './apiService/techRequestService';
import TechRequestList from './form/TechRequestList';



function App() {

  const [openEmailDialog, setOpenEmailDialog] = useState<boolean>(false);
  const [openTechRequestList, setOpenTechRequestList] = useState<boolean>(false);
  const [techRequests, setTechRequests] = useState<TechnicalRequest[]>([]);

  const fetchTechnicalRequests = async () => {
    const response = await getTechRequests();
    console.log(response, 'app file');
    setTechRequests(response.data);
  }

  useEffect(()=> {
  fetchTechnicalRequests();
  }, []);

  const handleOpenDialog = () => {
    setOpenEmailDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenEmailDialog(false);
  }

  const handleCloseList = () => {
    setOpenTechRequestList(false);
  }

  return (
<PrimeReactProvider>
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Pearson Form
        </p>
        <Button variant='outlined' onClick={handleOpenDialog}>
          Create Technical Request
        </Button>
        {techRequests.length > 0 ? <Button variant='outlined' onClick={
          ()=> setOpenTechRequestList(true)
        }>
          View Technical Requests
        </Button> : null }

 
    <TechRequestDialog open={openEmailDialog} handleCloseDialog={handleCloseDialog}/>

    <TechRequestList open={openTechRequestList} techRequests={techRequests} onClose={handleCloseList}/> 
      </header>
    </div>
    </PrimeReactProvider>
  );
}

export default App;
