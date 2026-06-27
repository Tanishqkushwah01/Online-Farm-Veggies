import { Link } from "react-router-dom";
import "./VerifySuccess.css";
import useWebNavigate from "../components/hooks/useWebNavigate";
import { useEffect } from "react";

const VerifySuccess = () => {
  const { gotoFarmer, gotoAdmin, gotoCustomer } = useWebNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
      const info = JSON.parse(localStorage.getItem("userInfo") || "{}");

      if (info.role === "Customer") {
        gotoCustomer();
      } else if (info.role === "Admin") {
        gotoAdmin();
      } else if (info.role === "Farmer") {
        gotoFarmer();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="success-animation mx-auto">
          <svg viewBox="0 0 140 140" className="success-svg">
            {/* Circle with a gap exactly where the tick exits */}
            <path
              className="success-circle"
              d="M 116.36 57.58 A 48 48 0 1 1 97.53 30.68"
            />

            <path
              className="success-check"
              d="
                M38 72
                Q46 82 58 92
                Q78 68 116 36
              "
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mt-5">
          Email Verified
        </h1>

        <p className="text-gray-500 mt-3">
          Your email has been verified successfully. Now you can login.
        </p>

        <Link
          to="/login"
          className="block w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default VerifySuccess;