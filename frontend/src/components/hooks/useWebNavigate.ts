import { useNavigate } from "react-router-dom";

const useWebNavigate = () => {
  const navigate = useNavigate();

  const gotoRegister = () => navigate("/register");

  const gotoLogin = () => navigate("/login");

  const goBack = () => navigate(-1);

  const gotoVerifySuccess = () => navigate("/verify-success");

  const gotoVerifyFailed = () => navigate("/verify-failed");

  const gotoAdmin = () => navigate("/admin");

  // const gotoCustomerProducts = () => navigate("/customer/products");

  const gotoCustomerProducts = (search?: string) => {
    if (search?.trim()) {
      navigate(`/customer/products?search=${encodeURIComponent(search)}`);
    } else {
      navigate("/customer/products");
    }
  };

  const gotoProductDetails = (
    productId: string,
    product: any,
    farmerDetails: any,
    review: any
  ) => {
    navigate(`/customer/product/${productId}`, {
      state: {
        product,
        farmerDetails,
        review,
      },
    });
  };

  const gotoFarmerProfile = (
    farmerId: string,
    farmer: any,
    products: any[],
    review: any
  ) => {
    navigate(`/customer/farmer/${farmerId}`, {
      state: {
        farmer,
        products,
        review,
      },
    });
  };
  // ✅ Updated
  // const gotoCustomer = (activePage = "home") => {
  //   navigate("/customer", {
  //     state: {
  //       activePage,
  //     },
  //   });
  // };
  const gotoCustomer = () => {
    navigate("/customer");
  };

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

  const gotoFarmerProduct = (productId: string) =>
    navigate("/farmer", {
      state: {
        activePage: "products",
        highlightProductId: productId,
      },
    });

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
    gotoCustomerProducts,
    gotoCustomer,
    gotoProductDetails,
    gotoFarmerProduct,
    gotoFarmerProfile,
  };
};

export default useWebNavigate;