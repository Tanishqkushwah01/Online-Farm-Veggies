import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const VerifySuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle size={60} className="text-green-600 mx-auto" />

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