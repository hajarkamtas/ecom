import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const priv = localStorage.getItem("priv");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && priv !== "A") {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default ProtectedRoute;
