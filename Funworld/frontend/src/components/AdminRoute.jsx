import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AdminRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth.user?.role === "admin" ? children : <Navigate to="/auth" replace />;
};

export default AdminRoute;

