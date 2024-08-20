/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUserData }) => {
  const apiUrl = import.meta.env.VITE_URL_API2;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data is in sessionStorage and redirect to /home if it exists
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Por favor, completa ambos campos.");
        return;
      }
      setLoading(true);

      // Send request to server for user authentication
      const response = await axios.post(`${apiUrl}login`, {
        email: email,
        password: password,
      });

      if (response.data) {
        // Store the authenticated user's data in sessionStorage
        sessionStorage.setItem("userData", JSON.stringify(response.data));
        
        // Set the user data in global state (if applicable)
        setUserData(response.data);
        
        // Redirect to the home page
        navigate("/home");
      } else {
        setError("Usuario no encontrado. Verifica tus credenciales.");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setError(
        "Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        {error && (
          <Typography sx={{ color: "red", marginTop: 2 }}>{error}</Typography>
        )}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Clave"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress
                  color="inherit"
                  size={20}
                  sx={{ marginRight: 1 }}
                />
                Ingresando
              </Box>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = ({ setUserData }) => {
//   const apiUrl = import.meta.env.VITE_URL_API2;

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Verificar si hay datos en sessionStorage y redirigir a /home si existen
//     const userData = sessionStorage.getItem("userData");
//     if (userData) {
//       navigate("/home");
//     }
//   }, [navigate]);

//   const handleLogin = async () => {
//     try {
//       if (!email || !password) {
//         alert("Por favor, completa ambos campos.");
//         return;
//       }
//       setLoading(true);
  
//       // Hacer la solicitud al servidor para autenticar al usuario
//       const response = await axios.post(`${apiUrl}login`, {
//         email: email,
//         password: password,
//       });
//       console.log(response.data)
  
//       if (response.data) {
//         // Almacenar los datos del usuario autenticado en sessionStorage
//         sessionStorage.setItem("userData", JSON.stringify(response.data));
        
//         // Establecer los datos del usuario en el estado global (si es necesario)
//         setUserData(response.data);
        
//         // Redirigir a la página de inicio
//         navigate("/home");
//       } else {
//         setError("Usuario no encontrado. Verifica tus credenciales.");
//       }
//     } catch (error) {
//       console.error("Error al intentar iniciar sesión:", error);
//       setError(
//         "Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Container component="main">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Iniciar sesión
//         </Typography>
//         {error && (
//           <Typography sx={{ color: "red", marginTop: 2 }}>{error}</Typography>
//         )}
//         <Box component="form" noValidate sx={{ mt: 3 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Clave"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={handleTogglePasswordVisibility}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <CircularProgress
//                   color="inherit"
//                   size={20}
//                   sx={{ marginRight: 1 }}
//                 />
//                 Ingresando
//               </Box>
//             ) : (
//               "Iniciar sesión"
//             )}
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
