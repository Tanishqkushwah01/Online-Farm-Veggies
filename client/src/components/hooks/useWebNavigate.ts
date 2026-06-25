import { useNavigate } from "react-router-dom";

const useWebNavigate = () => {
  const navigate = useNavigate();

  const gotoRegister = () => navigate("/register");
  const gotoLogin = () => navigate("/login");
  const gotoTerms = () => navigate("/terms");

  return {
    gotoRegister,
    gotoLogin,
    gotoTerms
  };
};

export default useWebNavigate;