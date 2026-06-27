import { Navigate, Outlet, useLocation } from "react-router-dom";

const VerifyEmailGuard = () => {
  const location = useLocation();

  if (!location.state?.fromRegister) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
};

export default VerifyEmailGuard;