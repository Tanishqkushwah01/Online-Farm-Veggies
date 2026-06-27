import { Navigate, Outlet, useLocation } from "react-router-dom";

const ForgotGuard = () => {
  const location = useLocation();

  const allowed = location.state?.fromLogin === true;

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ForgotGuard;