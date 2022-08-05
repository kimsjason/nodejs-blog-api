import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);
  const { loading } = auth;

  // render private route if done loading & user is authorized
  if (!loading) {
    return auth.data ? children : navigate("/login");
  }

  // redirect to login if user access private route without authentication
  if (loading && !auth.data.isAuthenticated) {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
