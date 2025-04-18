import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "../constants";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { LOGIN } = ROUTES;

  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN} replace />;
};

export default PrivateRoute;
