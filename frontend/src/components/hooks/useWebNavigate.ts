import { useNavigate } from "react-router-dom";

const useWebNavigate = () => {
  const navigate = useNavigate();

  const gotoRegister = () => navigate("/register");

  const gotoLogin = () => navigate("/login");

  const gotoTerms = () => navigate("/terms");

  const gotoVerifyEmail = () => navigate("/verifyEmail");

  const gotoForgotPassword = () =>
    navigate("/forgot-password", {
      state: { fromLogin: true },
    });

  const gotoResetPassword = (token: string) =>
    navigate(`/reset-password/${token}`);

  return {
    gotoRegister,
    gotoLogin,
    gotoTerms,
    gotoVerifyEmail,
    gotoForgotPassword,
    gotoResetPassword,
  };
};

export default useWebNavigate;