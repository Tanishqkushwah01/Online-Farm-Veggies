import { AlertTriangle, Home } from "lucide-react";
import useWebNavigate from "../components/hooks/useWebNavigate";

const PageNotFound = () => {
    const {gotoLogin} = useWebNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center">

        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle
            size={52}
            className="text-red-500"
          />
        </div>

        <h1 className="text-7xl font-extrabold text-green-700 mt-8">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 mt-3">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 leading-7">
          The page you're looking for doesn't exist or may have been removed.
          Please check the URL or return to the Login page.
        </p>

        <button
        onClick={gotoLogin}
          className="mt-8 cursor-pointer inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          <Home size={20} />
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;