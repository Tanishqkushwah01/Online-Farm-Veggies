import { useState } from "react";
import { Lock, EyeOff, Eye, User } from "lucide-react";
import { changePasswordSchema } from "../../Validation/ChangePassword.schema";
import { changePassword } from "../../Api/authApi";

type ChangePasswordProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const ChangePassword = ({ setActivePage }: ChangePasswordProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = changePasswordSchema.safeParse({
      identifier,
      password,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        identifier: fieldErrors.identifier?.[0],
        password: fieldErrors.password?.[0],
      });

      return;
    }

    setErrors({});

    try {
      setLoading(true);
      const isEmail = result.data.identifier.includes("@");

      const data = isEmail
        ? {
          email: result.data.identifier,
          password: result.data.password,
        }
        : {
          phoneNumber: result.data.identifier,
          password: result.data.password,
        };
      console.log(data)
      const response = await changePassword(data);

      console.log("res data change password ==", response.data);

      if (response.data.success) {
        window.open("https://mail.google.com/mail/u/0/#spam", "_blank");
          window.location.href = "/page";
        localStorage.clear();
        window.close();
      } else {
        alert("email nhi gyi");
      }
      setIdentifier("");
      setPassword("");
    } catch (error: any) {
      console.log("hi there")
      console.log(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#EEF3EC] px-4">

      {/* Go Back Button */}
      <button
        // onClick={goBack}
        onClick={() => setActivePage("settings")}
        className="absolute top-10 left-10 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
      >
        ← Go Back
      </button>

      {/* Change Password Card */}
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
          {/* <div>
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
          </div> */}
          <div>

            <div className="relative">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email or Phone Number"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>

            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.identifier || ""}
            </p>
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              {/* Lock Icon */}
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              {/* Input */}
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-blue-500"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.password || ""}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-14 w-full cursor-pointer rounded-xl bg-green-600 text-lg font-semibold text-white transition-all hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Verify Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;