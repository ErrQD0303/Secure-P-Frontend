import { useSelector } from "react-redux";
import { isAuthenticated } from "../store/userSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath: string;
}

function ProtectedRoute({ redirectPath = "/login" }: ProtectedRouteProps) {
  const isAuth = useSelector(isAuthenticated);
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} replace state={{ from: location }} />
  );
}

export default ProtectedRoute;
