/* eslint-disable react/function-component-definition */
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

/**
 * Renders the protected route component based on the authentication status.
 *
 * @return {ReactElement} The rendered component, either the Outlet if authenticated, or a Navigate to the login page if not authenticated.
 */
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
