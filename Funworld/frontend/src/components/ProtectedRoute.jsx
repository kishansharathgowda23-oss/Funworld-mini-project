import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth.token ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;

