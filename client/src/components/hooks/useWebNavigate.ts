import { useNavigate } from "react-router-dom";

const useWebNavigate = () => {
  const navigate = useNavigate();

  const gotoRegister = () => navigate("/register");
  const gotoLogin = () => navigate("/login");
  const gotoTerms = () => navigate("/terms");
  const gotoVerifyEmail = () => navigate("/veryifyEmail");

  return {
    gotoRegister,
    gotoLogin,
    gotoTerms,
    gotoVerifyEmail
  };
};

export default useWebNavigate;