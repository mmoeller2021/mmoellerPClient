import  { useState } from "react";
import logo from "./PLogo.png";
import "./App.css";
import TechRequestDialog from "./form/TechRequestDialog";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-blue/theme.css";
import { Button } from "@mui/material";
import TechRequestList from "./form/TechRequestList";

function App() {
  const [openEmailDialog, setOpenEmailDialog] = useState<boolean>(false);
  const [openTechRequestList, setOpenTechRequestList] =
    useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenEmailDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEmailDialog(false);
  };

  const handleCloseList = () => {
    setOpenTechRequestList(false);
  };

  const handleOpenList = () => {
    setOpenTechRequestList(true);
  };

  return (
    <div>
      <PrimeReactProvider>
        <header className="App-header">
          <img src={logo} alt="logo" />
          <p>Pearson Form</p>
          <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" onClick={handleOpenList}>
              View Technical Requests
            </Button>
            <Button variant="contained" onClick={handleOpenDialog}>
              Create Technical Request
            </Button>
          </div>
          <TechRequestDialog
            open={openEmailDialog}
            onClose={handleCloseDialog}
          />
          <TechRequestList
            open={openTechRequestList}
            onClose={handleCloseList}
          />
        </header>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
