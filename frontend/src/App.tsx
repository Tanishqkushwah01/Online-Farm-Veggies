import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/Api/ProtectedRoute";
import VerifyEmail from "./pages/verifyEmail";
import VerifySuccess from "./pages/VerifySuccess";
import VerifyFailed from "./pages/VerifyFailed";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import ForgotGuard from "./components/Guards/ForgotGuard";
import TermsGuard from "./components/Guards/TermsGuard";
import Terms from "./pages/Terms";
import VerifyEmailGuard from "./components/Guards/VerifyEmailGuard";
import PageNotFound from "./pages/PageNotFound";
import ProductDetails from "./components/layouts/Customer/Product/ProductDetails";
import { ProductProvider } from "./components/context/FarmerProductContext";
import CustomerLayout from "./components/layouts/Customer/CustomerLayout";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* in dono ko guard karna hai thik hai  */}
      <Route path="/verify-success" element={<VerifySuccess />} />
      <Route path="/verify-failed" element={<VerifyFailed />} />

      <Route element={<ForgotGuard />}>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<TermsGuard />}>
        <Route path="/terms" element={<Terms />} />
      </Route>

      <Route element={<VerifyEmailGuard />}>
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>

      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<PageNotFound />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<CustomerLayout />}>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/product/:id" element={<ProductDetails />} />
        </Route>

        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;