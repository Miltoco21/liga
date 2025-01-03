/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Registro from './Pages/Registro';
import Login from './Pages/Login';
// import Usuarios from './Pages/Usuarios';
import Usuarios from '../src/Componentes/Usuarios/Usuarios';
import ProtectedRoute from './Componentes/ProtectedRoute';
import Equipos from './Componentes/Equipos/Equipos';
import Jugadores from './Componentes/Jugadores/Jugadores';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import TeamDetails from './Componentes/Equipos/TeamDetails'; 
import Plantilla from './Componentes/Equipos/Plantilla';


function App() {
  const [userData, setUserData] = useState([]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUserData={setUserData} />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home userData={userData} setUserData={setUserData} />} />}
        />
        <Route
          path="/"
          element={<ProtectedRoute element={<Home userData={userData} setUserData={setUserData} />} />}
        />
        <Route path="/usuarios" element={<ProtectedRoute element={<Usuarios />} />} />
        <Route path="/equipos" element={<ProtectedRoute element={<Equipos />} />} />
        <Route path="/equipo/:nombre" element={<ProtectedRoute element={<Plantilla />} />} />
        <Route path="/jugadores" element={<ProtectedRoute element={<Jugadores />} />} />
      </Routes>
    </Router>
    </LocalizationProvider>
  );
}

export default App;
