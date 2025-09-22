import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // عدل المسار لو مختلف

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // لو مفيش يوزر مسجل دخوله
    return <Navigate to="/login" />;
  }

  return user?.role === "admin" ? children : <Navigate to="*" />;
}

export default AdminRoute;
