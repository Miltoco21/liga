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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
const IngresoJugadores = ({ onClose }) => {
  const [errors, setErrors] = useState([]);
  const [nombre, setNombre] = useState("");
  const [posicion, setPosicion] = useState([]);
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState([]);
  const [fechaNacimiento, setFechaNacimiento] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [equipos, setEquipos] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState("");

  const fetchEquipos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_API2}equipos`
      );
      setEquipos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: "array" });

      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        if (jsonData.length > 0) {
          const firstDataRow = jsonData[0];
          setRazonSocial(firstDataRow.razonSocial || "");
          setGiro(firstDataRow.giro || "");
          setEmail(firstDataRow.email || "");
          setDireccion(firstDataRow.direccion || "");
          setTelefono(firstDataRow.telefono || "");
          setRegion(firstDataRow.region || "");
          setComuna(firstDataRow.comuna || "");
          setSucursal(firstDataRow.sucursal || "");
          setUlrPagina(firstDataRow.pagina || "");
          setFormaPago(firstDataRow.formaPago || "");
          setRut(firstDataRow.rut || "");
          setNombreResponsable(firstDataRow.nombreResponsable || "");
          setcorreoResponsable(firstDataRow.correoResponsable || "");
          setTelefonoResponsable(firstDataRow.telefonoResponsable || "");
        }
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleExportExcel = () => {
    const jsonData = [
      {
        razonSocial: razonSocial,
        giro: giro,
        email: email,
        direccion: direccion,
        telefono: telefono,
        comuna: comuna,
        region: region,
        sucursal: sucursal,
        pagina: pagina,
        formaPago: formaPago,
        rut: rut,
        nombreResponsable: nombreResponsable,
        correoResponsable: correoResponsable,
        telefonoResponsable: telefonoResponsable,
      },
    ];

    const worksheet = xlsx.utils.json_to_sheet(jsonData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelBlob, "exported_data.xlsx");
  };

  /////////Validacion Input/////
  const handleNumericKeyDown = (event) => {
    const key = event.key;
    const input = event.target.value;
    if (!/\d/.test(key) && key !== "Backspace" && key !== "Delete") {
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
  const validateFields = () => {
    const newErrors = {};
    if (!nombre) newErrors.nombre = "El nombre es requerido.";
    if (!posicion) newErrors.posicion = "La posición es requerida.";
    if (!email) newErrors.email = "El email es requerido.";
    if (!rut) newErrors.rut = "El RUT es requerido.";
    if (!fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida.";
    if (!selectedEquipo) newErrors.selectedEquipo = "El equipo es requerido.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) return; // Stop submission if validation fails

    setLoading(true);

    const jugadorData = {
      nombre,
      posicion,
      email,
      rut,
      fechaNacimiento: fechaNacimiento.format("DD-MM-YYYY"),
      equipo_id: selectedEquipo,
    };

    try {
      const response = await axios.post("http://localhost:8000/jugadores", jugadorData);
      if (response.status === 200) {
        setSnackbarOpen(true)
        setSnackbarMessage("Jugador creado con éxito"||response.data.message);
        setNombre("");
        setPosicion("");
        setEmail("");
        setRut("");
        setFechaNacimiento(dayjs());
        setSelectedEquipo("");
        onClose();
      } else {
        setSnackbarMessage("Hubo un error al crear el jugador");
      }
    } catch (error) {
      setSnackbarMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validarRutChileno = (rut) => {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
      return false;
    }

    const partesRut = rut.split("-");
    const digitoVerificador = partesRut[1].toUpperCase();
    const numeroRut = partesRut[0];

    if (numeroRut.length < 7) {
      return false;
    }

    const calcularDigitoVerificador = (T) => {
      let M = 0;
      let S = 1;
      for (; T; T = Math.floor(T / 10)) {
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      }
      return S ? String(S - 1) : "K";
    };

    return calcularDigitoVerificador(numeroRut) === digitoVerificador;
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
              <h2>Ingreso Jugador</h2>
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
                  <ul>
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
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
                Selecciona Posición
              </InputLabel>
              <TextField
                select
                label="Posición"
                fullWidth
                value={posicion}
                onChange={(e) => setPosicion(e.target.value)}
                onKeyDown={handleTextOnlyKeyDown}
              >
                <MenuItem value="arquero">Arquero</MenuItem>
                <MenuItem value="mediocampo">Mediocampo</MenuItem>
                <MenuItem value="defensa">Defensa</MenuItem>
                <MenuItem value="delantero">Delantero</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ marginBottom: "2%" }}>Ingresa Email</InputLabel>
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
                Ingresa rut sin puntos y con guión
              </InputLabel>
              <TextField
                fullWidth
                label="ej: 11111111-1"
                name="rut"
                value={rut}
                onKeyDown={handleRUTKeyDown}
                onChange={(e) => setRut(e.target.value)}
                inputProps={{
                  maxLength: 16,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ marginBottom: "2%" }}>
                Ingresa Fecha de Nacimiento
              </InputLabel>
              <DatePicker
                format="DD/MM/YYYY"
                value={fechaNacimiento}
                onChange={(date) => setFechaNacimiento(dayjs(date))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ marginBottom: "2%" }}>
                Selecciona Equipo
              </InputLabel>
              <TextField
                select
                label="Equipo"
                fullWidth
                value={selectedEquipo}
                onChange={(e) => setSelectedEquipo(e.target.value)}
              >
                {equipos.map((equipo) => (
                  <MenuItem key={equipo.id} value={equipo.id}>
                    {equipo.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button type="submit" disabled={loading} variant="contained">
                {loading ? (
                  <>
                    Guardando... <CircularProgress size={24} />
                  </>
                ) : (
                  "Guardar"
                )}
              </Button>
              <Button variant="contained" color="secondary" onClick={onClose}>
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

export default IngresoJugadores;
