/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Typography, Button, Dialog, Grid } from "@mui/material";

import Add from "@mui/icons-material/Add";

import SideBar from "../NavBar/SideBar";
import TablaEquipos from "./TablaEquipos";
import IngresoEquipo from "./IngresoEquipo";





export default function Equipos() {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Grid component="main" sx={{ flexGrow: 1, p: 2 }}>
       
          <Typography
            variant="h4"
            component="div"
            sx={{ mb: 4, textAlign: "center" }}
          >
           Equipos
          </Typography>
          <Button
            variant="outlined"
            sx={{
              my: 1,
              mx: 2,
            }}
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Crear equipo
          </Button>

          <TablaEquipos/>
          
       
      </Grid>

      <Dialog open={open} onClose={handleCloseModal}>
        <Grid
          sx={{
            top: "50%",
            left: "50%",

            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            // overflow: "auto",
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "90%" }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <IngresoEquipo onClose={handleCloseModal} />
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
