/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Button,
  Dialog,
  TextField,
  Box,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TablaEquipos = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false); // State to control the modal
  const [selectedTeam, setSelectedTeam] = useState(null); // State for the selected team
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_API2}equipos`
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (team) => {
    setSelectedTeam(team);
    console.log("equipo:", selectedTeam); // Set the selected team
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setSelectedTeam(null); // Clear the selected team
  };

  const handleSaveChanges = async () => {
    if (!selectedTeam) {
      console.error("No hay equipo seleccionado para guardar");
      return;
    }

    try {
      console.log("Saving changes for team:", selectedTeam);
      const response = await axios.put(
        `${import.meta.env.VITE_URL_API2}equipos/${selectedTeam.id}`,
        selectedTeam
      );
      console.log("Changes saved:", response.data);
      setSnackbarMessage("Cambios guardados con éxito");
      setSnackbarOpen(true);
      setOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      setSnackbarMessage("Error al guardar los cambios");
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTeam((prevTeam) => ({
      ...prevTeam,
      [name]: value,
    }));
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderCard = (item) => (
    <Grid item xs={12} sm={2} md={2} key={item.id}>
      <Card
        sx={{
          height: "150%",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar size="large" label={item.nombre} />
          <Typography gutterBottom variant="h6" component="div">
            {item.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Delegado:
          </Typography>
          <Chip sx={{ m: 1 }} label={item.representante} />
        </CardContent>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            alignItems: "center",
            margin: 1,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(item)}
          >
            Editar
          </Button>
          <Button variant="contained" color="primary">
            Borrar
          </Button>
        </Grid>
      </Card>
    </Grid>
  );

  return (
    <>
      <div>
        {data.length > 0 ? (
          <Grid container spacing={1} sx={{ padding: 1 }}>
            {data.map(renderCard)}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </div>

      {/* Modal for editing team */}
      <Dialog open={open} onClose={handleClose}>
        <Grid
          sx={{
            width: 400,
            borderRadius: 2,
            p: 4,
          }}
        >
          {selectedTeam && (
            <>
              <Typography variant="h6" component="h2">
                Editar Equipo
              </Typography>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={selectedTeam.nombre}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Logo"
                name="logo"
                value={selectedTeam.logo}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={selectedTeam.email}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Representante"
                name="representante"
                value={selectedTeam.representante}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Capitán"
                name="capitan"
                value={selectedTeam.capitan}
                onChange={handleInputChange}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                sx={{ mt: 2 }}
              >
                Guardar Cambios
              </Button>
            </>
          )}
        </Grid>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default TablaEquipos;
