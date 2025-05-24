import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("access_token"); // Or use context/state
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
