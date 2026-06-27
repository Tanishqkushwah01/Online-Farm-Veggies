import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useParams } from "react-router-dom";
import useWebNavigate from "../components/hooks/useWebNavigate";
import { resetPassword } from "../components/Api/authApi";

const ResetPassword = () => {
  const { token } = useParams();
  const { gotoLogin } = useWebNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    api?: string;
  }>({});

  const handleResetPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!password.trim()) {
      setErrors({
        password: "Password is required",
      });
      return;
    }

    if (!confirmPassword.trim()) {
      setErrors({
        confirmPassword: "Confirm password is required",
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      if (!token) {
        setErrors({ api: "Invalid reset token" });
        return;
      }

      const response = await resetPassword({ token, password });

      if (response.data.success) {
        setPassword("");
        setConfirmPassword("");
        gotoLogin();
      }
    } catch (error: any) {
      setErrors({
        api: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF3EC] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-600">
          Reset Password
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Create a new password for your account.
          <br />
          Make sure both passwords match.
        </p>

        {errors.api && (
          <p className="text-red-500 text-sm text-center mt-5">
            {errors.api}
          </p>
        )}

        <form
          noValidate
          onSubmit={handleResetPassword}
          className="mt-8 space-y-4"
        >
          <div>
            {/* <label className="block font-medium mb-2">
              New Password
            </label> */}

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.password || ""}
            </p>
          </div>

          <div>
            {/* <label className="block font-medium mb-2">
              Confirm Password
            </label> */}

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.confirmPassword || ""}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <h1 className="text-gray-700">
            Remember your password?
            <span
              onClick={gotoLogin}
              className="text-green-600 cursor-pointer font-semibold"
            >
              {" "}
              Login here
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;