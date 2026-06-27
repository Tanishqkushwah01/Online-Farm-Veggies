import { useState } from "react";
import Potato from "../assets/images/patato.png";
import { User, Mail, Phone, Lock } from "lucide-react";
import useWebNavigate from "../components/hooks/useWebNavigate";
import { registerSchema } from "../components/Validation/register.schema";
import { userRegister } from "../components/Api/authApi";

const Register = () => {
  const [role, setRole] = useState<"Customer" | "Farmer">("Customer");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const { gotoLogin, gotoTerms,gotoVerifyEmail } = useWebNavigate();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = registerSchema.safeParse({
      role,
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
      terms,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        username: fieldErrors.username?.[0],
        email: fieldErrors.email?.[0],
        phoneNumber: fieldErrors.phoneNumber?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
        terms: fieldErrors.terms?.[0],
      });

      return;
    }

    setErrors({});
    const data = {password,email,username,phoneNumber,role}
    const res = await userRegister(data);
    gotoVerifyEmail();
    const userInfo = JSON.stringify(res.data.User);
    console.log(userInfo)
    localStorage.setItem("userInfo",userInfo);
    localStorage.setItem("token", res.data.token);

    setUsername("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    setTerms(false);
  }

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Left image */}
      <div className="w-150 h-screen bg-black">
        <img
          src={Potato}
          alt="Farm"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Right section */}
      <div className="flex-1 h-screen flex flex-col items-center bg-[#EEF3EC] px-6 overflow-hidden">
        <div className="flex flex-col items-center gap-2 mt-4 mb-4">
          <h1 className="text-black font-bold text-4xl">
            Create an Account
          </h1>
          <h3 className="text-black font-semibold text-xl">
            Fill in the details to get started
          </h3>
        </div>
        <div className="flex w-75 h-12 border border-gray-300 rounded-lg overflow-hidden mb-8">
          <button
            type="button"
            onClick={() => setRole("Customer")}
            className={`flex-1 font-semibold transition-all ${role === "Customer"
              ? "bg-green-600 text-white"
              : "bg-white cursor-pointer text-black"
              }`}
          >
            Customer
          </button>

          <button
            type="button"
            onClick={() => setRole("Farmer")}
            className={`flex-1 font-semibold transition-all ${role === "Farmer"
              ? "bg-green-600 text-white"
              : "bg-white cursor-pointer text-black"
              }`}
          >
            Farmer
          </button>
        </div>


        <form onSubmit={handleRegister} className="space-y-1 w-96">
          <div>
            <div className="relative">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Full Name"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-red-500 text-xs mt-0.5 h-4">
              {errors.username || ""}
            </p>
          </div>

          <div>
            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-red-500 text-xs mt-0.5 h-4">
              {errors.email || ""}
            </p>
          </div>

          <div>
            <div className="relative">
              <Phone
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-red-500 text-xs mt-0.5 h-4">
              {errors.phoneNumber || ""}
            </p>
          </div>

          <div>
            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-red-500 text-xs mt-0.5 h-4">
              {errors.password || ""}
            </p>
          </div>

          <div>
            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full h-11 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-red-500 text-xs mt-0.5 h-4">
              {errors.confirmPassword || ""}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="accent-green-600 cursor-pointer"
              />

              <label htmlFor="terms" className="text-gray-600 cursor-pointer">
                I agree to the{" "}
              </label>

              <span
                onClick={gotoTerms}
                className="text-green-600 font-semibold cursor-pointer hover:underline"
              >
                Terms & Conditions
              </span>
            </div>

            <p className="text-red-500 text-xs mt-0.5 h-4">
              {errors.terms || ""}
            </p>
          </div>

          <button
        
            type="submit"
            className="w-full h-12 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="mt-4">
          <h1>
            Already have an account?
            <span
              onClick={gotoLogin}
              className="text-green-600 cursor-pointer"
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

export default Register;