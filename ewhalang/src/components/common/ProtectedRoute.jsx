import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    console.error("User is not authenticated");
    return <Navigate to="/login" />;
  }

  return children;
};
