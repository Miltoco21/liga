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

function App() {
  const [userData, setUserData] = useState([]);

  return (
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
      </Routes>
    </Router>
  );
}

export default App;
