import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("access_token");
  return token ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
