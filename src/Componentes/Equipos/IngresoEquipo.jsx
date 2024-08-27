/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  TextField,
  IconButton,
  Button,
  CircularProgress,
  MenuItem,
  InputLabel,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const IngresoEquipo = ({ onClose }) => {
  const apiUrl = import.meta.env.VITE_URL_API2;
  const [errors, setErrors] = useState([]);
  const [nombre, setNombre] = useState("");
  const [logo, setLogo] = useState([]);
  const [email, setEmail] = useState("");
  const [representante, setRepresentante] = useState([]);
  const [capitan, setCapitan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");


  /////////Validacion Input/////
  const handleNumericKeyDown = (event) => {
    const key = event.key;
    const input = event.target.value;
    if (
      !/\d/.test(key) &&
      key !== "Backspace" &&
      key !== "Delete"
    ) {
      event.preventDefault();
    }
    if (key === " " && (input.length === 0 || input.endsWith(" "))) {
      event.preventDefault();
    }
  };

  const handleTextKeyDown = (event) => {
    const key = event.key;
    const input = event.target.value;
    if (
      !/^[a-zA-Z0-9]$/.test(key) &&
      key !== " " &&
      key !== "Backspace" &&
      key !== "Delete"
    ) {
      event.preventDefault();
    }
    if (key === " " && (input.length === 0 || input.endsWith(" "))) {
      event.preventDefault();
    }
  };

  const handleEmailKeyDown = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 32) {
      event.preventDefault();
    }
  };

  const handleRUTKeyDown = (event) => {
    const key = event.key;
    const input = event.target.value;
    if (
      !isNaN(key) ||
      key === "Backspace" ||
      key === "Delete" ||
      (key === "-" && !input.includes("-"))
    ) {
    } else {
      event.preventDefault();
    }
    if (
      key === " " &&
      (input.length === 0 || event.target.selectionStart === 0)
    ) {
      event.preventDefault();
    }
  };

  const handleTextOnlyKeyDown = (event) => {
    const key = event.key;
    const input = event.target.value;
    if (
      !/[a-zA-Z]/.test(key) &&
      key !== " " &&
      key !== "Backspace" &&
      key !== "Delete"
    ) {
      event.preventDefault();
    }
    if (key === " " && (input.length === 0 || input.endsWith(" "))) {
      event.preventDefault();
    }
  };

  // Handle Submit Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
   
   

    // Data to send
    const equipoData = {
      
        nombre,
        logo,
        email,
        representante,
        capitan,
    };
    console.log("Datos antes del envío:", equipoData);
 
    try {
        // const response = await axios.post(`${apiUrl}equipos`, equipoData);
        const response = await axios.post('http://localhost:8000/equipos', equipoData);

        console.log("Respuesta del servidor:", response);
        if (response.status === 200) {
            setSnackbarMessage("Equipo creado con éxito");
            setSnackbarOpen(true);
            // Reset form fields
            setNombre("");
            setLogo("");
          
            setRepresentante("");
            setCapitan("");
            onClose();
        } else {
            setSnackbarMessage("Hubo un error al crear el equipo");
            setSnackbarOpen(true);
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            setSnackbarMessage(`Error del servidor: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            // Request was made but no response was received
            setSnackbarMessage("No se recibió respuesta del servidor. Verifique su conexión a internet.");
        } else {
            // Something else caused the error
            setSnackbarMessage(`Error: ${error.message}`);
        }
        setSnackbarOpen(true);
    } finally {
        setLoading(false);
    }
    // Log the final state after request processing
    console.log("Estado final después del procesamiento:", {
        nombre,
        logo,
       
        representante,
        capitan,
        loading: false,
    });
};


  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        py: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 2, borderRadius: 2, maxWidth: 1200, width: "100%" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Ingreso Equipos</h2>
            </Grid>
            <Grid item xs={12} md={12}>
              {Object.keys(errors).length > 0 && (
                <div
                  style={{
                    color: "red",
                    marginBottom: "1%",
                    marginTop: "1%",
                  }}
                >
                  <ul>{Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}</ul>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ marginBottom: "2%" }}>
                Ingresa Nombre
              </InputLabel>
              <TextField
                label="Nombre"
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                error={!!errors.nombre}
                helperText={errors.nombre}
                onKeyDown={handleTextOnlyKeyDown}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ marginBottom: "2%" }}>
                Ingresa Logo
              </InputLabel>
              <TextField
                label="Logo"
                fullWidth
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                onKeyDown={handleTextOnlyKeyDown}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel sx={{ marginBottom: "2%" }}>
              Ingresa Email
            </InputLabel>
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEmailKeyDown}
              // helperText={errors.email}
            />
          </Grid>
          
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ marginBottom: "2%" }}>
                Ingresa Representante
              </InputLabel>
              <TextField
                fullWidth
                label="Representante"
                name="representante"
                value={representante}
                onKeyDown={handleTextOnlyKeyDown}
                onChange={(e) => setRepresentante(e.target.value)}
                inputProps={{
                  maxLength: 16,
                }}
                error={!!errors.representante}
                helperText={errors.representante}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ marginBottom: "2%" }}>
                Ingresa Capitán
              </InputLabel>
              <TextField
                fullWidth
                label="Capitán"
                name="capitan"
                value={capitan}
                onKeyDown={handleTextOnlyKeyDown}
                onChange={(e) => setCapitan(e.target.value)}
                inputProps={{
                  maxLength: 16,
                }}
                error={!!errors.capitan}
                helperText={errors.capitan}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="submit"
                disabled={loading}
                variant="contained"
               
              >
                {loading ? (
                  <>
                    Guardando... <CircularProgress size={24} />
                  </>
                ) : (
                  "Guardar"
                )}
              </Button>
              <Button  variant="contained" color="secondary" onClick={onClose}>
                cerrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes("éxito") ? "success" : "error"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default IngresoEquipo;
