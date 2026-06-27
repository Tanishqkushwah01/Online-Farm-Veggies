import { useState } from "react";
import { Mail } from "lucide-react";
import { forgotPasswordSchema } from "../components/Validation/Forgot.schema";
import { forgotPassword } from "../components/Api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
  }>({});

  const handleForgotPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result = forgotPasswordSchema.safeParse({
      email,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0],
      });

      return;
    }

    setErrors({});

    try {
      setLoading(true);
      const email = result.data.email;
      const response = await forgotPassword(email);
      console.log(response.data)
      if (response.data.success) {
        window.open("https://mail.google.com/mail/u/0/#spam", "_blank");
        window.open("/page");
        window.close();
      }

      // alert(response.data.message);

      setEmail("");
    } catch (error: any) {
      console.log(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF3EC] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-600">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Enter your registered email to receive a password
          <br />
          reset link.
        </p>

        <form
          noValidate
          onSubmit={handleForgotPassword}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="block font-medium mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>

            <p className="text-red-500 text-sm mt-1 h-5">
              {errors.email || ""}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all cursor-pointer disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;