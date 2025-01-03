/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Typography, Button, Dialog, Grid } from "@mui/material";

import Add from "@mui/icons-material/Add";

import SideBar from "../NavBar/SideBar";
import TablaEquipos from "./TablaEquipos";
import IngresoEquipo from "./IngresoEquipo";
import { useParams } from 'react-router-dom';



const Plantilla = () => {
  const { nombre } = useParams();
  return (
    <div style={{ display: "flex" }}>
    <SideBar />
    <Grid component="main" sx={{ flexGrow: 1, p: 2 }}>
 <Typography
            variant="h4"
            component="div"
            sx={{ mb: 4, textAlign: "center" }}
          >
          Detalles del Equipo: {nombre}
          </Typography>

    </Grid>
 
   

     
   

    
  </div>
  )
}

export default Plantilla