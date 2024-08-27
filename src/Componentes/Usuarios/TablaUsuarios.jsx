/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Tabs,
  Tab,
  Pagination,
  IconButton,
  Avatar,
  Box,
  Grid,
  Typography,
  Snackbar,
  InputLabel,
  Button,
  Table,
  TableBody,
  CircularProgress,
  TableCell,
  TableContainer,
  MenuItem,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";

const TablaUsuarios = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_API2}registro`
      );
      setData(response.data);
      console.log(response.data); // Actualiza el estado de data
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      // Puedes manejar el error aquí si es necesario
    }
  };

  useEffect(() => {
    fetchData(); // Llama a fetchData cuando el componente se monta
  }, []);

  return (
    <div>
      {/* Aquí puedes renderizar los datos de la tabla */}
      {data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Define los encabezados de la tabla aquí */}
                <TableCell></TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Email</TableCell>
                {/* Otros encabezados según los datos */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((usuario) => (
                <TableRow key={usuario.index}>
                  <TableCell></TableCell>
                  <TableCell>{usuario.nombre}
                  <br />{usuario.apellido}
                    <br />{usuario.email}
                  </TableCell>
                  <TableCell></TableCell>
                  {/* Otros datos según los datos */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default TablaUsuarios;
