import { Navigate, Outlet, useLocation } from "react-router-dom";

const TermsGuard = () => {
  const location = useLocation();

  if (!location.state?.fromRegister) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
};

export default TermsGuard;