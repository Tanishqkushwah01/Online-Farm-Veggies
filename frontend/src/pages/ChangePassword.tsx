import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { changePasswordSchema } from "../components/Validation/ChangePassword.schema";
import { changePassword } from "../components/Api/authApi";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleChangePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result = changePasswordSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });

      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const response = await changePassword(result.data);

      console.log(response.data);

      if (response.data.success) {
        alert("Password changed successfully");
      }

      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.log(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF3EC] px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-green-600">
          Change Password
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Enter your email and your new password.
        </p>

        <form
          noValidate
          onSubmit={handleChangePassword}
          className="mt-8 space-y-5"
        >
          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-green-500"
              />
            </div>

            <p className="mt-1 h-5 text-sm text-red-500">
              {errors.email || ""}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium">
              New Password
            </label>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-green-500"
              />
            </div>

            <p className="mt-1 h-5 text-sm text-red-500">
              {errors.password || ""}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-14 w-full cursor-pointer rounded-xl bg-green-600 text-lg font-semibold text-white transition-all hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;