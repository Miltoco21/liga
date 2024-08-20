/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const userData = sessionStorage.getItem('userData');
  
  if (!userData) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
