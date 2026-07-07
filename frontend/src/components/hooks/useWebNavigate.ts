import { useNavigate } from "react-router-dom";

const useWebNavigate = () => {
  const navigate = useNavigate();

  const gotoRegister = () => navigate("/register");

  const gotoLogin = () => navigate("/login");

  const goBack = () => navigate(-1);

  const gotoVerifySuccess = () => navigate("/verify-success");
  const gotoVerifyFailed = () => navigate("/verify-failed");
  const gotoAdmin = () => navigate("/admin");


  // const gotoProductDetails = (productId: string) => navigate(`/customer/product/${productId}`);
  const gotoProductDetails = (
    productId: string,
    product: any,
    farmerDetails: any
  ) => {
    navigate(`/customer/product/${productId}`, {
      state: {
        product,
        farmerDetails,
      },
    });
  };

  const gotoCustomer = () => navigate("/customer");

  // const gotoFarmer = (activePage = "dashboard") => {
  //   navigate("/farmer", {
  //     state: { activePage },
  //   });
  // };
  const gotoFarmer = () => navigate("/farmer");

  const gotoForgotPassword = () =>
    navigate("/forgot-password", {
      state: { fromLogin: true },
    });

  const gotoTerms = () =>
    navigate("/terms", {
      state: { fromRegister: true },
    });

  const gotoVerifyEmail = () =>
    navigate("/verify-email", {
      state: { fromRegister: true },
    });

  const gotoResetPassword = (token: string) =>
    navigate(`/reset-password/${token}`);

  return {
    gotoRegister,
    gotoLogin,
    goBack,
    gotoTerms,
    gotoVerifyEmail,
    gotoForgotPassword,
    gotoResetPassword,
    gotoVerifySuccess,
    gotoVerifyFailed,
    gotoFarmer,
    gotoAdmin,
    gotoCustomer,
    gotoProductDetails
  };
};

export default useWebNavigate;