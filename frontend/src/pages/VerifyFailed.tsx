import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const VerifyFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <XCircle size={60} className="text-red-600 mx-auto" />

        <h1 className="text-2xl font-bold text-gray-800 mt-5">
          Verification Failed
        </h1>

        <p className="text-gray-500 mt-3">
          Verification link is invalid or expired.
        </p>

        <Link
          to="/signup"
          className="block w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default VerifyFailed;