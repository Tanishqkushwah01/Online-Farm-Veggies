// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import useWebNavigate from "../components/hooks/useWebNavigate"
// const ResetPassword = () => {


//     const { token } = useParams();

//     const navigate = useNavigate();
//     const { gotoLogin } = useWebNavigate();

//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }

//         try {
//             setLoading(true);

//             const res = await axios.post(
//                 `http://localhost:3000/api/auth/reset-password/${token}`,
//                 {
//                     password,
//                 }
//             );
//             console.log("res.success")
//             if (res.data.success) {
//                 gotoLogin();
//             }
//             // alert(res.data.message);



//             navigate("/login");
//         } catch (error: any) {
//             console.log(error.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gray-100">
//             <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
//                 <h2 className="text-3xl font-bold text-center mb-6">
//                     Reset Password
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                         <label className="font-medium">New Password</label>
//                         <input
//                             type="password"
//                             className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-green-500"
//                             placeholder="Enter new password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="font-medium">Confirm Password</label>
//                         <input
//                             type="password"
//                             className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-green-500"
//                             placeholder="Confirm password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition"
//                     >
//                         {loading ? "Resetting..." : "Reset Password"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ResetPassword;



import { useState } from "react";
import axios from "axios";
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