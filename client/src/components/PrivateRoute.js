import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(authContext);
  const { loading } = auth;

  if (!loading)
    return auth.data.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
