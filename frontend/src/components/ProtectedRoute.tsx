// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import LoadingSpinner from "./LoadingSpinner";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, checkingAuth } = useUserStore();

  if (checkingAuth) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
