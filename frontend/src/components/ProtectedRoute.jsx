import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // 🛑 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🛑 Trying to access admin route without admin role
  if (role === 'admin' && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
